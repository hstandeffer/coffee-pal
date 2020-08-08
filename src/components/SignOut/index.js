import React from 'react'
import { StyledButton } from './style'
import * as ROUTES from '../../constants/routes'

import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../Firebase'

const handleSignout = async props => {
  await props.firebase.doSignOut()
  await props.history.push(ROUTES.LANDING)
}

const SignOutButton = (props) => (
  <StyledButton type="button" onClick={() => handleSignout(props)}>Sign Out</StyledButton>
);

export default compose(withFirebase, withRouter)(SignOutButton)