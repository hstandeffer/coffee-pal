import React from 'react';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import { compose } from "recompose";
import { withRouter } from 'react-router-dom';
import { Input, CheckLabel, CheckInput, StyledDiv, StyledButton } from './style';

const INITIAL_STATE = {
  coffeeName: '',
  coffeeBrand: '',
  roastType: '',
  wholeBean: true,
}

const HomePage = () => (
  <StyledDiv>
    <h1>Add Coffee to Your List</h1>
    <Home />
  </StyledDiv>
)

class HomeBase extends React.Component {
  constructor(props) {
    super(props)

    this.state = {...INITIAL_STATE}
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onChangeChecked = event => {
    this.setState({ [event.target.name]: event.target.checked })
  }

  onSubmit = event => {
    event.preventDefault()
    const { coffeeName, coffeeBrand, roastType, wholeBean } = this.state;
    
    this.props.firebase.coffees().push().set({ coffeeName, coffeeBrand, roastType, wholeBean })
  }

  render() {
    const {
      coffeeName,
      coffeeBrand,
      roastType,
      wholeBean,
    } = this.state;

    const isInvalid = 
      coffeeName === '' ||
      coffeeBrand === '' ||
      roastType === '';

    return(
      <form onSubmit={this.onSubmit}>
        <Input
          name="coffeeBrand"
          type="text"
          placeholder="Coffee Brand"
          value={coffeeBrand}
          onChange={this.onChange}
        >
        </Input>
        <Input
          name="coffeeName"
          type="text"
          placeholder="Coffee Name"
          value={coffeeName}
          onChange={this.onChange}
        >
        </Input>
        <Input
          name="roastType"
          type="text"
          placeholder="Roast Type"
          value={roastType}
          onChange={this.onChange}
        >
        </Input>
        <CheckLabel>Whole Bean?</CheckLabel>
        <CheckInput
          name="wholeBean"
          type="checkbox"
          checked={wholeBean}
          onChange={this.onChangeChecked}
        >
        </CheckInput>
        <StyledButton disabled={isInvalid} type="submit">Add Coffee</StyledButton>
      </form>
    )
  }
}

const Home = compose(
  withRouter,
  withFirebase,
)(HomeBase)

const condition = authUser => !!authUser; //shorthand for if authUser DOES NOT EQUAL null

export default withAuthorization(condition)(HomePage);