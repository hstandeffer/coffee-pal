import React from 'react'
import { Redirect } from 'react-router-dom'

import AuthUserContext from './context'
import * as ROUTES from '../../constants/routes'

const withAuthorization = condition => Component => props => {
  return (
    <AuthUserContext.Consumer>
      {authUser => {
          if (authUser && (!condition(authUser) || condition(authUser) === 'public')) {
            return <Redirect to={ROUTES.BROWSE} />
          }
          if (!authUser && (condition(authUser) !== 'public')) {
            return <Redirect to={ROUTES.SIGN_IN} />
          }
          return condition(authUser) ? <Component {...props} /> : null
        }
      }
    </AuthUserContext.Consumer>
  )
}

export default withAuthorization