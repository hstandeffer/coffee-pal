// import React, { useState } from 'react'
// import { compose } from 'recompose'

// import fetch from 'node-fetch'
// import * as ROLES from '../../constants/roles'
// import { StyledDiv } from '../../shared-style.js'

// const Admin = () => {
//   const [loading, setLoading] = useState(false)
//   const [users, setUsers] = useState([])
//   const [search, setSearch] = useState('')
//   const [info, setInfo] = useState('')
//   const [roastInput, setRoastInput] = useState('')
//   const [singleOriginInput, setSingleOriginInput] = useState(false)
//   const [blendInput, setBlendInput] = useState(false)

//   const getUsers = () => {
//     setLoading(true)
//     firebase.users().once('value', snapshot => {
//       const usersObject = snapshot.val()

//       const usersList = Object.keys(usersObject).map(key => ({
//         ...usersObject[key],
//         uid: key,
//       }))

//       setUsers(usersList)
//       setLoading(false)
//     })
//   }

//   const handleSubmit = async event => {
//     event.preventDefault()

//     // make request of given URL, needs to handle errors
//     const html = await fetch(search)

//     // parse returned html into text
//     const data = await html.text()

//     // create parser and convert text to HTML document
//     const parser = new DOMParser()
//     const doc = parser.parseFromString(data, 'text/html')

//     const getMetaContent = (property) => {
//       return (doc.querySelector(property) ? doc.querySelector(property).getAttribute('content') : null)
//     }

//     const title = getMetaContent('meta[property="og:title"]')

//     let foundTitle = ''
//     await firebase.coffees().orderByChild('title').equalTo(title).limitToFirst(1).once("value", snapshot => {
//       if (snapshot.exists()) {
//         const found = snapshot.val()
//         const key = Object.keys(found)[0]
//         foundTitle = found[key].title
//       }
//     })

//     if (foundTitle) {
//       setInfo(`The coffee: '${foundTitle}' already exists`)
//       setSearch('')
//       return false
//     }

//     const body = doc.querySelector('body').innerText

//     let roast
//     if(!!roastInput && roastInput !== 'default') {
//       roast = roastInput
//     }

//     if (!roast) {
//       roast = search.includes('light-roast') ? 'light'
//       : search.includes('medium-roast') ? 'medium'
//       : search.includes('dark-roast') ? 'dark'
//       : null
//     }
    
//     const countryList = ['Brazil', 'Vietnam', 'Columbia', 'Colombia', 'Sumatra', 'Indonesia', 'Ethiopia', 'Honduras', 'India', 'Uganda', 'Mexico', 'Guatemala', 'Peru', 'Nicaragua', 'Costa Rica']
//     const countries = []
//     for (const country of countryList) {
//       if (body.includes(country)) {
//         countries.push(country)
//       }
//     }
//     // declaring description here to search for items more quickly and so these terms are only searched for in description
//     const description = getMetaContent('meta[property="og:description"]')

//     const fairTrade = description.toLowerCase().includes('fair trade') || description.toLowerCase().includes('fair-trade')
//       || title.toLowerCase().includes('fair trade') || title.toLowerCase().includes('fair-trade') || null
//     const organic = description.toLowerCase().includes('organic') || description.toLowerCase().includes('organic')
//       || title.toLowerCase().includes('organic') || title.toLowerCase().includes('organic') || null
//     const shadeGrown = description.toLowerCase().includes('shade grown') || description.toLowerCase().includes('shade-grown')
//       || title.toLowerCase().includes('shade grown') || title.toLowerCase().includes('shade-grown') || null

//     let singleOrigin
//     if(!!singleOriginInput && singleOriginInput !== 'default') {
//       singleOrigin = singleOriginInput
//     }

//     if (!singleOrigin) {
//       singleOrigin = description.toLowerCase().includes('single origin') || description.toLowerCase().includes('single-origin')
//       || title.toLowerCase().includes('single origin') || title.toLowerCase().includes('single-origin') || null
//     }

//     let blend
//     if(!!blendInput) {
//       blend = blendInput || null
//     } else {
//       blend = null
//     }


//     const metaCoffeeObj = {
//       title,
//       price: getMetaContent('meta[property="og:price:amount"]') || getMetaContent('meta[property="product:price:amount"]'),
//       currency: getMetaContent('meta[property="og:price:currency"]') || getMetaContent('meta[property="product:price:currency"]'),
//       description,
//       url: getMetaContent('meta[property="og:url"]'),
//       imageUrl: getMetaContent('meta[property="og:image:secure_url"]'),
//       siteName: getMetaContent('meta[property="og:site_name"]'),
//       roastType: roast,
//       countries,
//       organic,
//       fairTrade,
//       shadeGrown,
//       singleOrigin,
//       blend
//     }

//     // TODO: set this object to a useState value and then display the data it found and allow edits before uploading to db

//     if (!window.confirm(`is the data correct? ${JSON.stringify(metaCoffeeObj)}`)) {
//       setSearch('')
//       setInfo(`${metaCoffeeObj.siteName}'s ${metaCoffeeObj.title} was not added to the database`)
//       setRoastInput('default')
//       return false
//     }
//     // chain a new unique key with push command and then set the object created above
//     firebase.coffees().push().set(metaCoffeeObj)
    
//     setSearch('')
//     setRoastInput('default')
//     setInfo(`${metaCoffeeObj.siteName}'s ${metaCoffeeObj.title} has been successfully added to the database`)
//   }

//   return (
//     <StyledDiv>
//       <h1>Admin</h1>

//       {loading && <div>Loading...</div>}
//       {info && <div>{info}</div>}

//       { users.length > 0 ? <UserList users={users} /> : <button style={{margin: '20px auto'}} onClick={getUsers}>Load user list</button> }

//       <form style={{margin: '20px auto'}} onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={search}
//           placeholder="Enter a product URL link"
//           onChange={({ target }) => setSearch(target.value)}
//         />
//         <button disabled={search.length === 0} type="submit">Submit</button>
//       </form>
//       <label>Input roast manually: </label><select value={roastInput} onChange={({ target }) => setRoastInput(target.value)}>
//         <option value="default">Roast Type</option>
//         <option value="light">Light</option>
//         <option value="medium">Medium</option>
//         <option value="dark">Dark</option>
//       </select>
//       <div>
//         Single Origin?<input type="checkbox" checked={singleOriginInput} onChange={({ target }) => setSingleOriginInput(target.checked)} />
//       </div>
//       <div>
//         Blend?<input type="checkbox" checked={blendInput} onChange={({ target }) => setBlendInput(target.checked)} />
//       </div>
//     </StyledDiv>
//   )
// }

// const UserList = ({ users }) => (
//   <ul>
//     {users.map(user => (
//       <li key={user.uid}>
//         <span><strong> User ID:</strong> {user.uid}</span>
//         <span><strong> Email:</strong> {user.email}</span>
//         <span><strong> Username:</strong> {user.username}</span>
//       </li>
//     ))}
//   </ul>
// ) 

// export default Admin