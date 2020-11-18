import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'

import AuthUserContext from './context'
import * as ROUTES from '../../constants/routes'

const withAuthorization = condition => Component => props => {
  const authContext = useContext(AuthUserContext)
  if (authContext.isLoggedIn && (condition() === 'public')) {
    return <Redirect to={ROUTES.BROWSE} />
  }
  if (!authContext.isLoggedIn && (condition() !== 'public' && condition() !== 'all')) {
    return <Redirect to={ROUTES.SIGN_IN} />
  }
  return condition(authContext.isLoggedIn) ? <Component {...props} /> : null
}

export default withAuthorization