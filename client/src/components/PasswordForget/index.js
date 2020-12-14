import React, { useState } from 'react'
import * as ROUTES from '../../constants/routes'
import { Input, StyledDiv, StyledButton, StyledLink, Wrapper, StyledH1 } from '../../shared-style'

import Toast from '../../shared/components/Toast'

import Box from '@material-ui/core/Box'
import { Typography } from '@material-ui/core'

import userService from '../../services/user'

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
      console.error(err)
    }
  }

  return (
    <Wrapper>
      <StyledDiv>
        <StyledH1>Forgot your password?</StyledH1>
        <Box p="1rem" border={1} borderColor='#ededed'>
          <Typography variant="h6" component="p">Reset Password</Typography>
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
            {error && <p>{error.message}</p>}
          </form>
        </Box>
      </StyledDiv>
      <Toast open={open} setOpen={setOpen} severity="success" message="If an account exists, a password reset link will be sent to the submitted email." />
    </Wrapper>
  )
}

export const PasswordForgetLink = () => (
  <p><StyledLink to={ROUTES.PASSWORD_FORGET}>Forgot Password?</StyledLink></p>
)

export default PasswordForget