import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withAuthorization } from '../Session';
import { Wrapper, Input, StyledDiv, StyledButton, StyledLink } from '../../shared-style';

import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <Wrapper>
    <StyledDiv>
      <h1>Sign Up</h1>
      <SignUpForm />
    </StyledDiv>
  </Wrapper>
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
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.BROWSE);
      })
      .catch(error => {
        this.setState({ error });
      });
      

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error
    } = this.state;

    const isInvalid = 
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === ''

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
        <StyledButton disabled={isInvalid} type="submit">Sign Up</StyledButton> 

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

const condition = () => 'public'

export default withAuthorization(condition)(SignUpPage)

export { SignUpForm, SignUpLink }