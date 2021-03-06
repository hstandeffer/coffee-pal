import React, { useState } from 'react'
import * as ROUTES from '../../constants/routes'
import { InputWithLabelAbove, StyledDiv, StyledButton, StyledLink, Wrapper } from '../../shared-style'

import Toast from '../../shared/components/Toast'
import Seo from '../../shared/components/Seo'

import Box from '@material-ui/core/Box'
import { FormLabel, Typography } from '@material-ui/core'

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
      <Seo title={'Forgot Password'} />
      <StyledDiv>
        <Typography gutterBottom paragraph variant="h4" component="h2">Forgot password?</Typography>
        <Box textAlign="left">
          <form onSubmit={handleSubmit}>
            <FormLabel required htmlFor="email">Email</FormLabel>
            <InputWithLabelAbove
              name="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              type="email"
              tabIndex="1"
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
          <Box textAlign="center" mt={2}>
            <SignUpLink />
            <SignInLink />
          </Box>
        </Box>
      </StyledDiv>
      <Toast open={open} setOpen={setOpen} severity="success" message="If an account exists, a password reset link will be sent to the submitted email." />
    </Wrapper>
  )
}

export const PasswordForgetLink = () => (
  <Typography component="p" color="textSecondary"><StyledLink to={ROUTES.PASSWORD_FORGET}>Forgot Password?</StyledLink></Typography>
)

export default PasswordForget