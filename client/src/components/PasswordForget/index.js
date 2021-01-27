import React, { useState } from 'react'
import * as ROUTES from '../../constants/routes'
import { Input, StyledDiv, StyledButton, StyledLink, Wrapper, StyledH1 } from '../../shared-style'

import Toast from '../../shared/components/Toast'

import Box from '@material-ui/core/Box'
import { Typography } from '@material-ui/core'

import userService from '../../services/user'
import { SignInLink } from '../SignIn'
import { SignUpLink } from '../SignUp'
import Alert from '@material-ui/lab/Alert'

const PasswordForget = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await userService.forgotPassword(email).catch((err) => {
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

    setEmail('')
    setOpen(true)
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
          { error &&
            <Box my="1rem">
              <Alert severity="error">{error}</Alert>
            </Box>
          }
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