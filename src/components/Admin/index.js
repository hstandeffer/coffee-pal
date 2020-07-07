import React, { useState, useEffect } from 'react';
import fetch from 'node-fetch'

import { withFirebase } from '../Firebase';

const Admin = ({ firebase }) => {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [info, setInfo] = useState(null)

  useEffect(() => {
    setLoading(true)
    firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val()

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }))

      setUsers(usersList)
      setLoading(false)
    })
    return () => {
      firebase.users().off()
    }
  }, [firebase])

  const onSubmit = async event => {
    event.preventDefault()

    // make request of given URL, needs to handle errors
    const html = await fetch(search)

    // parse returned html into text
    const data = await html.text()

    // create parser and convert text to HTML document
    const parser = new DOMParser()
    const doc = parser.parseFromString(data, 'text/html')
    
    // parse the ld+json document into an object
    const ldjson = JSON.parse(doc.querySelector('script[type="application/ld+json"]').innerText)
    const obj = {
      brand: ldjson.brand,
      image: ldjson.image,
      name: ldjson.name,
      url: ldjson.url,
      lowPrice: ldjson.offers.lowPrice,
      highPrice: ldjson.offers.highPrice,
      currency: ldjson.offers.priceCurrency,
      offers: ldjson.offers.offers
    }
    
    // NEED TO ADD LOGIC FROM HOMEPAGE TO ADD THE RETURNED COFFEE TO FIREBASE DB
    setSearch('')
    setInfo(obj)
  }

  return (
    <div>
      <h1>Admin</h1>

      {loading && <div>Loading...</div>}

      <UserList users={users}/>

      <form onSubmit={onSubmit}>
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

// class Admin extends React.Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       loading: false,
//       users: [],
//       search: '',
//       info: null,
//     };
//   }

//   componentDidMount() {
//     this.setState({ loading: true })
//     this.props.firebase.users().on('value', snapshot => {
//       const usersObject = snapshot.val()

//       const usersList = Object.keys(usersObject).map(key => ({
//         ...usersObject[key],
//         uid: key,
//       }))

//       this.setState({
//         users: usersList,
//         loading: false,
//       });
//     });
//   }

//   componentWillUnmount() {
//     this.props.firebase.users().off();
//   }

//   onSubmit = async event => {
//     event.preventDefault()
//     const html = await fetch(this.state.search)
//     const data = await html.text()
//     const parser = new DOMParser()
//     const doc = parser.parseFromString(data, 'text/html')
    
//     const ldjson = JSON.parse(doc.querySelector('script[type="application/ld+json"]').innerText)
//     const obj = {
//       brand: ldjson.brand,
//       image: ldjson.image,
//       name: ldjson.name,
//       url: ldjson.url,
//       lowPrice: ldjson.offers.lowPrice,
//       highPrice: ldjson.offers.highPrice,
//       currency: ldjson.offers.priceCurrency,
//       offers: ldjson.offers.offers
//     }
//     console.log(obj)
//     this.setState({ search: '' })
//     this.setState({ info: obj })
//   }

//   render() {
//     const { users, loading, search } = this.state;

//     return (
//       <div>
//         <h1>Admin</h1>

//         {loading && <div>Loading...</div>}

//         <UserList users={users}/>

//         <form onSubmit={this.onSubmit}>
//           <input
//             type="text"
//             value={search}
//             placeholder="Enter a product URL link"
//             onChange={({ target }) => this.setState({ search: target.value })}
//           />
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     )
//   }
// }

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>User ID:</strong> {user.uid}
        </span>
        <span>
          <strong> Email:</strong> {user.email}
        </span>
        <span>
          <strong> Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
) 

export default withFirebase(Admin)