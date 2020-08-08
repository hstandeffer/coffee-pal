import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withAuthorization } from '../Session';
import { StyledH1, Wrapper, Input, StyledDiv, StyledButton } from '../../shared-style';

import { SignUpLink } from '../SignUp'
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <Wrapper>
    <StyledDiv>
      <StyledH1>Login</StyledH1>
      <SignInForm />
      <PasswordForgetLink />
      <SignUpLink />
    </StyledDiv>
  </Wrapper>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null, 
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
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

  render() {
    const {
      email,
      password,
      error
    } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <Input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <Input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <StyledButton disabled={isInvalid} type="submit">Sign In</StyledButton>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}


const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);
  
const condition = () => 'public'

export default withAuthorization(condition)(SignInPage)