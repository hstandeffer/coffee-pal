import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { StyledH1, Wrapper, Input, StyledDiv, StyledButton, StyledLink } from '../../shared-style';
import AuthUserContext from '../Session/context'

import userService from '../../services/user'

import * as ROUTES from '../../constants/routes';
import { Typography, Box } from '@material-ui/core';
import { SignInLink } from '../SignIn';
import Alert from '@material-ui/lab/Alert';

const SignUp = () => {
  const authUserContext = useContext(AuthUserContext)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      username,
      email,
      password
    }

    const response = await userService.signUp(user).catch((err) => {
      if (err.errors) {
        setError(`${err.errors[0].msg} for ${err.errors[0].param} field.`)
      }
      else {
        setError(err.error)
      }
    })

    if (!response) {
      return
    }

    const userObj = {
      token: response.token,
      id: response.user.id
    }
    authUserContext.login(userObj)
    return (<Redirect to={ROUTES.BROWSE} />) 
  }

  const isInvalid = 
    password !== confirmPassword ||
    password === '' ||
    email === '' ||
    username === ''

  return (
    <Wrapper>
      <StyledDiv>
        <StyledH1>Sign Up</StyledH1>
        <form onSubmit={handleSubmit}>
          <Input
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            type="text"
            placeholder="Username"
            tabIndex="1"
          />
          <Input
            name="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            type="text"
            placeholder="Email Address"
            tabIndex="2"
          />
          <Input
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            type="password"
            placeholder="Password"
            tabIndex="3"
          />
          <Input
            name="confirmPassword"
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
            type="password"
            placeholder="Confirm Password"
            tabIndex="4"
          />
          <StyledButton disabled={isInvalid} tabIndex="5" type="submit">Sign Up</StyledButton> 
          
          { error &&
            <Box my="1rem">
              <Alert severity="error">{error}</Alert>
            </Box>
          }

          <Box mt={2}>
            <SignInLink />
          </Box>
        </form>
      </StyledDiv>
    </Wrapper>
  )
}

export const SignUpLink = () => (
  <Typography component="p" color="textSecondary">Don't have an account? <StyledLink to={ROUTES.SIGN_UP}>Sign Up</StyledLink></Typography>
)

export default SignUp