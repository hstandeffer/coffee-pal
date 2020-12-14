import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { withAuthorization } from '../Session';
import { StyledH1, Wrapper, Input, StyledDiv, StyledButton } from '../../shared-style';
import AuthUserContext from '../Session/context'
import { useParams } from 'react-router-dom'

import axios from 'axios'

import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <Wrapper>
    <StyledDiv>
      <StyledH1>Reset Password</StyledH1>
      <SignUpForm />
    </StyledDiv>
  </Wrapper>
);

const SignUpForm = () => {
  const authUserContext = useContext(AuthUserContext)

  const [loading, setLoading] = useState(true)
  const [invalid, setInvalid] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

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
  

  const handleSubmit = event => {
    event.preventDefault();
    const newPassword = { password }

    axios.post('/api/users/update-password', newPassword)
      .then(response => {
        authUserContext.login(response.data.token)
        return (<Redirect to={ROUTES.BROWSE} />)
      })
      .catch(error => {
        setError(error)
      })  
  };

  const isInvalid = 
    password !== confirmPassword ||
    password === ''

  if (invalid) {
    return (<Redirect to={ROUTES.PASSWORD_FORGET} />)
  }
  
  if (loading) return <p>Loading...</p>

  return (
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
  );
}

const condition = () => 'public'

export default withAuthorization(condition)(SignUpPage)