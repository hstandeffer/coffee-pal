import React, { useContext } from 'react'
import { StyledButton } from './style'
import * as ROUTES from '../../constants/routes'
import { AuthUserContext } from '../Session'
import { useHistory } from 'react-router-dom'

export const SignOutButton = (props) => {
  const authUserContext = useContext(AuthUserContext)
  const history = useHistory()

  const handleSignout = () => { 
    props.closeMenu()
    authUserContext.logout()
    history.push(ROUTES.LANDING)
  }
  
  return <StyledButton open={props.open} type="button" onClick={handleSignout}>Sign Out</StyledButton>
}

export default SignOutButton