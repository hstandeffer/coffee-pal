import React, { useState } from 'react'
import { Wrapper, InputWithLabelAbove, StyledDiv, StyledButton } from '../../shared-style'
import userService from '../../services/user'

import Toast from '../../shared/components/Toast'
import { Typography, FormLabel, Box } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

export const PasswordChangeForm = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)  

  const handleSubmit = async event => {
    event.preventDefault()
    const dataObj = { password }
    const response = await userService.changePassword(dataObj).catch((err) => {
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

    setOpen(true)
    setPassword('')
    setConfirmPassword('')
  }

  const isInvalid = 
    password !== confirmPassword ||
    password === ''

  return (
    <>
      <Typography gutterBottom variant="h5">Update Password</Typography>
      <Box textAlign="left">
        <form onSubmit={handleSubmit}>
          <FormLabel required htmlFor="password">Password</FormLabel>
          <InputWithLabelAbove
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            type="password"
            placeholder="Password"
          />
          <FormLabel required htmlFor="confirmPassword">Confirm Password</FormLabel>
          <InputWithLabelAbove
            name="confirmPassword"
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
            type="password"
            placeholder="Confirm Password"
          />
          <StyledButton disabled={isInvalid} type="submit">Update Password</StyledButton> 

          { error &&
            <Box my="1rem">
              <Alert severity="error">{error}</Alert>
            </Box>
          }
          <Toast open={open} setOpen={setOpen} severity="success" message="Your password has been successfully changed!" />
        </form>
      </Box>
    </>
  )
}

const PasswordChange = () => (
  <Wrapper>
    <StyledDiv>
      <PasswordChangeForm />
    </StyledDiv>
  </Wrapper>
)

export default PasswordChange