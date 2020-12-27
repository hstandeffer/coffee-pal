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
  const [loading, setLoading] = useState(true)
  const [invalid, setInvalid] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)

  let { token } = useParams()

  useEffect(() => {
    setLoading(true)
    axios.get(`/api/users/password-reset/${token}`)
    .then((response) => {
      if (response.status === 200) {
        setLoading(false)
      }
    })
    .catch((err) => {
      if (err.response.status === 403) {
        setInvalid(true)
      }
    })
  }, [token])
  

  const handleSubmit = async event => {
    event.preventDefault()
    const dataObj = { password, token }
    const response = await userService.updatePassword(dataObj)
    if (response.status === 200) {
      setOpen(true)
      setPassword('')
      setConfirmPassword('')
    } 
  }

  const isInvalid = 
    password !== confirmPassword ||
    password === ''

  if (invalid) {
    return (<Redirect to={ROUTES.PASSWORD_FORGET} />)
  }
  
  if (loading) return <p>Loading...</p>

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
    <Toast open={open} setOpen={setOpen} severity="success" message="Your password has been successfully reset! You may now login using the new password." />
  </Wrapper> 
  )
}

const condition = () => 'public'

export default withAuthorization(condition)(PasswordReset)