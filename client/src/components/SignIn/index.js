import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthUserContext } from '../Session'
import { StyledH1, Wrapper, Input, StyledDiv, StyledButton, StyledLink } from '../../shared-style'

import { SignUpLink } from '../SignUp'
import * as ROUTES from '../../constants/routes'
import authService from '../../services/auth'
import { PasswordForgetLink } from '../PasswordForget'
import { Typography, Box } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

const SignIn = () => {
  const authUserContext = useContext(AuthUserContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async event => {
    event.preventDefault()

    const user = {
      email,
      password
    }

    const response = await authService.signIn(user).catch((err) => {
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

  const isInvalid = password === '' || email === ''

  return (
    <Wrapper>
      <StyledDiv>
        <StyledH1>Sign in</StyledH1>
        <form onSubmit={handleSubmit}>
          <Input
            name="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            type="text"
            placeholder="Email Address"
            tabIndex="1"
          />
          <Input
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            type="password"
            placeholder="Password"
            tabIndex="2"
          />
          <StyledButton disabled={isInvalid} tabIndex="3" type="submit">Sign In</StyledButton>

          { error &&
            <Box my="1rem">
              <Alert severity="error">{error}</Alert>
            </Box>
          }

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

export default SignIn