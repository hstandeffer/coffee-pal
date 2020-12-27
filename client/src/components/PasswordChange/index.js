import React, { useState, useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { withAuthorization } from '../Session'
import { StyledH1, Wrapper, Input, StyledDiv, StyledButton } from '../../shared-style'
import { useParams } from 'react-router-dom'
import userService from '../../services/user'
import axios from 'axios'

import * as ROUTES from '../../constants/routes'
import Toast from '../../shared/components/Toast'

const PasswordReset = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)  

  const handleSubmit = async event => {
    event.preventDefault()
    const dataObj = { password }
    const response = await userService.changePassword(dataObj)
    if (response.status === 200) {
      setOpen(true)
      setPassword('')
      setConfirmPassword('')
    } 
  }

  const isInvalid = 
    password !== confirmPassword ||
    password === ''

  return (
    <Wrapper>
      <StyledDiv>
        <StyledH1>Reset Password</StyledH1>
        <form onSubmit={handleSubmit}>
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
        <StyledButton disabled={isInvalid} type="submit">Update Password</StyledButton> 

        {error && <p>{error.message}</p>}
      </form>
    </StyledDiv>
    <Toast open={open} setOpen={setOpen} severity="success" message="Your password has been successfully changed!" />
  </Wrapper> 
  )
}

const condition = () => 'public'

export default withAuthorization(condition)(PasswordReset)