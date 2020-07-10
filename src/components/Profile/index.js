import React, { useState, useEffect } from 'react';
import { StyledDiv, Ul } from './style'
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import { compose } from "recompose";
import { withRouter } from 'react-router-dom';

const ProfilePage = ({ firebase }) => {
  const [coffees, setCoffees] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    firebase.userCoffees(firebase.auth.currentUser.uid).once('value')
      .then((snapshot) => {
        const coffeeIdsObject = snapshot.val()
        const coffeeIdsList = Object.keys(coffeeIdsObject).map(key => ({
          ...coffeeIdsObject[key],
          uid: key,
        }))
        coffeeIdsList.forEach((item) => {
          firebase.coffee(item.uid).once('value')
            .then((snapshot) => {
              setCoffees(c => c.concat({...snapshot.val(), uid: item.uid})) // functional update using previous value to update
            })
        })
        setLoading(false)
      })
  }, [firebase])

  return (
    <StyledDiv>
      <h2>Your Saved Coffees</h2>
      {!loading ? 
        <Ul>
          {coffees.map(coffee => (
            <li key={coffee.title}>{coffee.title}</li>
          ))}
        </Ul>
        : <h2>Loading User's Coffees..</h2>
      }
    </StyledDiv>
  )
}

const Profile = compose(
  withRouter,
  withFirebase,
)(ProfilePage)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Profile)