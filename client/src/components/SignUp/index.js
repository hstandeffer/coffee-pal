import React, { useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { compose } from 'recompose';
import { withAuthorization } from '../Session';
import { StyledH1, Wrapper, Input, StyledDiv, StyledButton, StyledLink } from '../../shared-style';

import axios from 'axios'

import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <Wrapper>
    <StyledDiv>
      <StyledH1>Sign Up</StyledH1>
      <SignUpForm />
    </StyledDiv>
  </Wrapper>
);

const SignUpFormBase = (props) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  

  const handleSubmit = event => {
    event.preventDefault();

    const newUser = {
      username,
      email,
      password
    }

    axios.post('/api/users', newUser)
      .then(authUser => {
        console.log(authUser)
        props.setUser(authUser)
        return <Redirect to={ROUTES.BROWSE} />
      })
      .catch(error => {
        setError(error)
      })  
  };

  const isInvalid = 
    password !== confirmPassword ||
    password === '' ||
    email === '' ||
    username === ''

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="username"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
        type="text"
        placeholder="Username"
      />
      <Input
        name="email"
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        type="text"
        placeholder="Email Address"
      />
      <Input
        name="passwordOne"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        type="password"
        placeholder="Password"
      />
      <Input
        name="passwordTwo"
        value={confirmPassword}
        onChange={({ target }) => setConfirmPassword(target.value)}
        type="password"
        placeholder="Confirm Password"
      />
      <StyledButton disabled={isInvalid} type="submit">Sign Up</StyledButton> 

      {error && <p>{error.message}</p>}
    </form>
  );
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