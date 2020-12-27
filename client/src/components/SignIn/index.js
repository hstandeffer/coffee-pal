import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { withAuthorization, AuthUserContext } from '../Session'
import { StyledH1, Wrapper, Input, StyledDiv, StyledButton, StyledLink } from '../../shared-style'

import { SignUpLink } from '../SignUp'
import * as ROUTES from '../../constants/routes'
import axios from 'axios'
import { PasswordForgetLink } from '../PasswordForget'
import { Typography, Box } from '@material-ui/core'

const SignIn = () => {
  const authUserContext = useContext(AuthUserContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = event => {
    event.preventDefault()

    const user = {
      email,
      password
    }

    axios.post('/api/auth', user)
      .then(response => {
        authUserContext.login(response.data.token)
        return (<Redirect to={ROUTES.BROWSE} />)
      })
      .catch(error => {
        setError(error)
      })
  }

  const isInvalid = password === '' || email === ''

  return (
    <Wrapper>
      <StyledDiv>
        <StyledH1>Login</StyledH1>
        <form onSubmit={handleSubmit}>
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
          <StyledButton disabled={isInvalid} type="submit">Sign In</StyledButton>
          {error && <p className={{ color: 'red' }}>{error.message}</p>}

          <Box mt={2}>
            <PasswordForgetLink />
            <SignUpLink />
          </Box>
        </form>
      </StyledDiv>
    </Wrapper>
  )
}

export const SignInLink = () => (
  <Typography component="p" color="textSecondary">Already have an account? <StyledLink to={ROUTES.SIGN_IN}>Sign In</StyledLink></Typography>
)
  
const condition = () => 'public'

export default withAuthorization(condition)(SignIn)