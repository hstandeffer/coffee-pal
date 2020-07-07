import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Input, Select, StyledDiv, StyledButton, StyledLink } from './style';

import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <StyledDiv>
    <h1>Sign Up</h1>
    <SignUpForm />
  </StyledDiv>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  experience: '',
  favoriteBrewingMethod: '',
  favoriteRoastType: '',
  drinkOfChoice: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const {username, email, passwordOne, experience, favoriteBrewingMethod, favoriteRoastType, drinkOfChoice } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            experience,
            favoriteBrewingMethod,
            favoriteRoastType,
            drinkOfChoice
          });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
      

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      experience,
      favoriteBrewingMethod,
      favoriteRoastType,
      drinkOfChoice,
      error
    } = this.state;

    const isInvalid = 
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '' ||
      experience === 'Experience' ||
      favoriteBrewingMethod === '' ||
      favoriteRoastType === '' ||
      drinkOfChoice === '';

    return (
      <form onSubmit={this.onSubmit}>
        <Input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Username"
        />
        <Input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <Input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <Input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <Select name="experience" value={experience} onChange={this.onChange}>
          <option value="expLevel">Experience</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="expert">Expert</option>
        </Select>
        <Select name="favoriteBrewingMethod" value={favoriteBrewingMethod} onChange={this.onChange}>
          <option value="favBrew">Favorite Brewing Method</option>
          <option value="dripMachine">Drip Machine</option>
          <option value="espressoMachine">Espresso Machine</option>
          <option value="frenchPress">French Press</option>
          <option value="aeropress">Aeropress</option>
          <option value="moka">Moka Pot</option>
          <option value="other">Other</option>
        </Select>
        <Select name="favoriteRoastType" value={favoriteRoastType} onChange={this.onChange}>
          <option value="favRoast">Favorite Roast Type</option>
          <option value="beginner">Light</option>
          <option value="medium">Medium</option>
          <option value="expert">Dark</option>
        </Select>
        <Select name="drinkOfChoice" value={drinkOfChoice} onChange={this.onChange}>
          <option value="drinkOfChoice">Drink of Choice</option>
          <option value="blackCoffee">Black Coffee</option>
          <option value="espresso">Espresso</option>
          <option value="latte">Latte</option>
          <option value="cappucino">Cappucino</option>
          <option value="other">Other</option>
        </Select>
        <StyledButton disabled={isInvalid} type="submit">Sign Up</StyledButton> 
        {/* add a prop into the styles that will change the color depending on valid or not */}

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>Don't have an account? <StyledLink to={ROUTES.SIGN_UP}>Sign Up</StyledLink></p>
)

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };