import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Wrapper, InputWithLabelAbove, StyledDiv, StyledButton, StyledLink } from '../../shared-style';
import AuthUserContext from '../Session/context'

import userService from '../../services/user'

import * as ROUTES from '../../constants/routes';
import { Typography, Box, FormLabel } from '@material-ui/core';
import { SignInLink } from '../SignIn';
import Alert from '@material-ui/lab/Alert';
import Seo from '../../shared/components/Seo';

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
      password,
      confirmPassword
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

  return (
    <Wrapper>
      <Seo title={'Sign Up'} />
      <StyledDiv>
        <Typography gutterBottom paragraph variant="h4" component="h2">Sign Up</Typography>
        <Box textAlign="left">
          <form onSubmit={handleSubmit}>
            <FormLabel required htmlFor="username">Username</FormLabel>
            <InputWithLabelAbove name="username" value={username} onChange={({ target }) => setUsername(target.value)} type="text" tabIndex="1" />

            <FormLabel required htmlFor="email">Email</FormLabel>
            <InputWithLabelAbove name="email" value={email} onChange={({ target }) => setEmail(target.value)} type="text" tabIndex="2" />

            <FormLabel required htmlFor="password">Password</FormLabel>
            <InputWithLabelAbove name="password" value={password} onChange={({ target }) => setPassword(target.value)} type="password" tabIndex="3" />

            <FormLabel required htmlFor="confirmPassword">Confirm Password</FormLabel>
            <InputWithLabelAbove name="confirmPassword" value={confirmPassword} onChange={({ target }) => setConfirmPassword(target.value)} type="password" tabIndex="4" />

            <StyledButton tabIndex="5" type="submit">Sign Up</StyledButton> 
            
            { error &&
              <Box my="1rem">
                <Alert severity="error">{error}</Alert>
              </Box>
            }

            <Box textAlign="center" mt={2}>
              <SignInLink />
            </Box>
          </form>
        </Box>
      </StyledDiv>
    </Wrapper>
  )
}

export const SignUpLink = () => (
  <Typography component="p" color="textSecondary">Don't have an account? <StyledLink to={ROUTES.SIGN_UP}>Sign Up</StyledLink></Typography>
)

export default SignUp