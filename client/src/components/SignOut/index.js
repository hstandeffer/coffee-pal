import React, { useContext } from 'react'
import { StyledButton } from './style'
import * as ROUTES from '../../constants/routes'
import { withAuthorization, AuthUserContext } from '../Session'
import { Redirect } from 'react-router-dom'

export const SignOutButton = (props) => {
  const authUserContext = useContext(AuthUserContext)

  const handleSignout = () => {
    authUserContext.logout()
    props.closeMenu()
    return <Redirect to={ROUTES.LANDING} />
  }
  
  return <StyledButton open={props.open} type="button" onClick={handleSignout}>Sign Out</StyledButton>
}

const condition = authUser => !!authUser

export default withAuthorization(condition)(SignOutButton)