import React from 'react';
import { withAuthorization, AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import { compose } from "recompose";
import { withRouter } from 'react-router-dom';
import { Input, Wrapper, StyledCoffeeItemDiv, CenteredDiv } from './style';

const SearchPage = () => (
  <Wrapper>
    <h1>Search Coffees in Our Database</h1>
    <Search />
  </Wrapper>
)

class SearchBase extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchQuery: '',
      loading: false,
      coffees: [],
    }
  }

  componentDidMount() {
    this.setState({loading: true})
    this.props.firebase.coffees().on('value', snapshot => {
      const coffeeObject = snapshot.val()

      const coffeesList = Object.keys(coffeeObject).map(key => ({
        ...coffeeObject[key],
        uid: key,
      }))

      this.setState({
        coffees: coffeesList,
        loading: false
      })
    })
  }

  componentWillUnmount() {
    this.props.firebase.coffees().off();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onFavoriteClick = ( coffeeId ) => {
    this.props.firebase
      .userCoffees(this.props.firebase.auth.currentUser.uid, coffeeId)
      .set(true)
  }

  render() {
    const {
      searchQuery,
      coffees,
    } = this.state;

    return (
      <CenteredDiv>
        <Input
          name="searchQuery"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={this.onChange}
        />
        <CoffeeList coffees={coffees} searchQuery={searchQuery} onFavoriteClick={this.onFavoriteClick} />
      </CenteredDiv>
    )
  }
}

// filter through each coffee and find ones matching search query in brand or name
const CoffeeList = ({ coffees, searchQuery, onFavoriteClick }) => (
  <div>
    {coffees
      .filter(coffee => {
        return (
          (coffee.coffeeBrand.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1) ||
          (coffee.coffeeName.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
        )
      })
      .map(coffee => (
        <CoffeeItem coffee={coffee} key={coffee.uid} onFavoriteClick={onFavoriteClick} />
      ))
    }
  </div>
)

const CoffeeItem = ({ coffee, onFavoriteClick  }) => {
  return (
    <StyledCoffeeItemDiv>
      <strong>{coffee.coffeeBrand}</strong>
      <p>{coffee.coffeeName}</p>
      <p>{coffee.roastType}</p>
      <p>{coffee.wholeBean ? 'Whole Bean' : 'Ground'}</p>
      <button onClick={() => onFavoriteClick(coffee.uid)}>Add to List</button>
    </StyledCoffeeItemDiv>
  )
}

const Search = compose(
  withRouter,
  withFirebase,
)(SearchBase)

const condition = authUser => !!authUser; //shorthand for if authUser DOES NOT EQUAL null

export default withAuthorization(condition)(SearchPage);