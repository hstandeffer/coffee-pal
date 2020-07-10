import React, { useState } from 'react'
import { compose } from 'recompose'

import fetch from 'node-fetch'

import { withAuthorization } from '../Session'
import { withFirebase } from '../Firebase'
import * as ROLES from '../../constants/roles'

const Admin = ({ firebase }) => {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [info, setInfo] = useState('')


  const getUsers = () => {
    setLoading(true)
    firebase.users().once('value', snapshot => {
      const usersObject = snapshot.val()

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }))

      setUsers(usersList)
      setLoading(false)
    })
  }

  const handleSubmit = async event => {
    event.preventDefault()

    // make request of given URL, needs to handle errors
    const html = await fetch(search)

    // parse returned html into text
    const data = await html.text()

    // create parser and convert text to HTML document
    const parser = new DOMParser()
    const doc = parser.parseFromString(data, 'text/html')
    const title = doc.querySelector('meta[property="og:title"]').getAttribute('content')

    let foundTitle = ''
    await firebase.coffees().orderByChild('title').equalTo(title).limitToFirst(1).once("value", snapshot => {
      if (snapshot.exists()) {
        const found = snapshot.val()
        const key = Object.keys(found)[0]
        foundTitle = found[key].title
      }
    })

    if (foundTitle) {
      setInfo(`The coffee: '${foundTitle}' already exists`)
      setSearch('')
      return false
    }

    // would like to add: 1) whole bean option - surely there's very few with only ground options right? 2) weight 3) flavor notes
    const roast = search.includes('light-roast') ? 'light' // this assumes the "search" parameter returned valid HTML
      : search.includes('medium-roast') ? 'medium'
      : search.includes('dark-roast') ? 'dark'
      : null
    
    const countryList = ['Brazil', 'Vietnam', 'Columbia', 'Colombia', 'Sumatra', 'Indonesia', 'Ethiopia', 'Honduras', 'India', 'Uganda', 'Mexico', 'Guatemala', 'Peru', 'Nicaragua', 'Costa Rica']
    const body = doc.querySelector('body').innerText
    const countries = []
    for (const country of countryList) {
      if (body.includes(country)) {
        countries.push(country)
      }
    }
    // declaring description here to search for items more quickly and so these terms are only searched for in description
    const description = doc.querySelector('meta[property="og:description"]').getAttribute('content')

    const fairTrade = description.toLowerCase().includes('fair trade') || body.toLowerCase().includes('fair trade')
    const organic = description.toLowerCase().includes('organic') || body.toLowerCase().includes('organic')
    const shadeGrown = description.toLowerCase().includes('shade grown') || body.toLowerCase().includes('shade grown')
    
    const metaCoffeeObj = {
      title,
      price: doc.querySelector('meta[property="og:price:amount"]').getAttribute('content'),
      currency: doc.querySelector('meta[property="og:price:currency"]').getAttribute('content'),
      description,
      url: doc.querySelector('meta[property="og:url"]').getAttribute('content'),
      imageUrl: doc.querySelector('meta[property="og:image:secure_url"]').getAttribute('content'),
      siteName: doc.querySelector('meta[property="og:site_name"]').getAttribute('content'),
      roastType: roast,
      countries,
      organic,
      fairTrade,
      shadeGrown
    }


    // chain a new unique key with push command and then set the object created above
    firebase.coffees().push().set(metaCoffeeObj)
    
    setSearch('')
    setInfo(`${metaCoffeeObj.siteName}'s ${metaCoffeeObj.title} has been successfully added to the database`)
  }

  return (
    <div>
      <h1>Admin</h1>

      {loading && <div>Loading...</div>}
      {info && <div>{info}</div>}

      { users.length > 0 ? <UserList users={users} /> : <button onClick={getUsers}>Load user list</button> }

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          placeholder="Enter a product URL link"
          onChange={({ target }) => setSearch(target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span><strong> User ID:</strong> {user.uid}</span>
        <span><strong> Email:</strong> {user.email}</span>
        <span><strong> Username:</strong> {user.username}</span>
      </li>
    ))}
  </ul>
) 

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN]

export default compose(
  withAuthorization(condition),
  withFirebase
)(Admin)