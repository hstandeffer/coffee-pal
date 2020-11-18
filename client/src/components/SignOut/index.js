import React, { useContext } from 'react'
import { StyledButton } from './style'
import * as ROUTES from '../../constants/routes'
import { withAuthorization, AuthUserContext } from '../Session'
import { Redirect } from 'react-router-dom'

const SignOutButton = (props) => {
  const authUserContext = useContext(AuthUserContext)

  const handleSignout = async () => {
    await authUserContext.logout()
    await props.closeMenu()
    return <Redirect to={ROUTES.LANDING} />
  }
  
  return <StyledButton open={props.open} type="button" onClick={handleSignout}>Sign Out</StyledButton>
}

const condition = authUser => !!authUser

export default withAuthorization(condition)(SignOutButton)