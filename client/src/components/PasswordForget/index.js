import React, { useState } from 'react'
import * as ROUTES from '../../constants/routes'
import { Input, StyledDiv, StyledButton, StyledLink, Wrapper, StyledH1 } from '../../shared-style'

import Toast from '../../shared/components/Toast'

import Box from '@material-ui/core/Box'
import { Typography } from '@material-ui/core'

import userService from '../../services/user'
import { SignInLink } from '../SignIn'
import { SignUpLink } from '../SignUp'

const PasswordForget = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await userService.forgotPassword(email)
      setEmail('')
      setOpen(true)
    }
    catch (err) {
      setError(err)
    }
  }

  return (
    <Wrapper>
      <StyledDiv>
        <StyledH1>Forgot your password?</StyledH1>
        <div>
          <form onSubmit={handleSubmit}>
            <Input
              name="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              type="email"
              placeholder="Email Address"
            />
            <StyledButton disabled={email === ''} type="submit">
              Reset Password
            </StyledButton>
          </form>
          {error && <p>{error.message}</p>}
          <Box mt={2}>
            <SignUpLink />
            <SignInLink />
          </Box>
        </div>
      </StyledDiv>
      <Toast open={open} setOpen={setOpen} severity="success" message="If an account exists, a password reset link will be sent to the submitted email." />
    </Wrapper>
  )
}

export const PasswordForgetLink = () => (
  <Typography component="p" color="textSecondary"><StyledLink to={ROUTES.PASSWORD_FORGET}>Forgot Password?</StyledLink></Typography>
)

export default PasswordForget