import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { withAuthorization } from '../Session';
import { StyledH1, Wrapper, Input, StyledDiv, StyledButton, StyledLink } from '../../shared-style';
import AuthUserContext from '../Session/context'

import axios from 'axios'

import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <Wrapper>
    <StyledDiv>
      <StyledH1>Sign Up</StyledH1>
      <SignUpForm />
    </StyledDiv>
  </Wrapper>
);

const SignUpForm = () => {
  const authUserContext = useContext(AuthUserContext)

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
      .then(response => {
        authUserContext.login(response.data.token)
        return (<Redirect to={ROUTES.BROWSE} />)
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
        name="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        type="password"
        placeholder="Password"
      />
      <Input
        name="confirmPassword"
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

const condition = () => 'public'

export default withAuthorization(condition)(SignUpPage)

export { SignUpLink }