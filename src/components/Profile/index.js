import React from 'react';
import { StyledDiv } from './style'
import { withAuthorization, AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import { compose } from "recompose";
import { withRouter } from 'react-router-dom';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      coffees: []
    }
  }

  componentDidMount() { // no clue how this renders the data before sending response back, maybe restructure db or get help
    let temp = []
    this.props.firebase.userCoffees(this.props.firebase.auth.currentUser.uid).once('value')
    .then((snapshot) => {
      snapshot.forEach((child) => {
        this.props.firebase.coffee(child.key).once('value')
          .then(snapshot => {
            temp.push(snapshot.val())
            this.setState({coffees: temp})
          })
        })
      })
  }

  render() {
    return (
      <StyledDiv>
        <ul>
          {this.state.coffees.map(coffee => (
            <li key={coffee.coffeeName}>{coffee.coffeeBrand}</li>
          ))}
        </ul>
      </StyledDiv>
    )
  }
}

// const ProfilePage = ({ firebase }) => {
//   const [titles, setTitles] = useState([])

//   const getData = () => {
//     let temp = []
//     firebase.userCoffees(firebase.auth.currentUser.uid).once('value')
//       .then((snapshot) => {
//         snapshot.forEach((child) => {
//           console.log('sent request ', child.key)
//           firebase.coffee(child.key).once('value')
//             .then(snapshot => {
//               console.log('got response', snapshot.val())
//               temp.push(snapshot.val())
//               return snapshot.val()
//             })
//         })
//       })
//   }

//   useEffect(() => {
//     const data = getData()
//     console.log(data)
//   }, [])

//     return (
//       <h2>{titles ? JSON.stringify(titles) : 'Hi'}</h2>
//     )
// }

const Profile = compose(
  withRouter,
  withFirebase,
)(ProfilePage)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ProfilePage)