import React from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import AuthUserContext from './context'
import { withFirebase} from '../Firebase'
import * as ROUTES from '../../constants/routes'

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    _isMounted = false;

    constructor(props) {
      super(props)

      this.state = {
        loaded: false
      }
    }

    componentDidMount() {
      this._isMounted = true
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          if (!condition(authUser) || condition(authUser) === 'public') {
            this.props.history.push(ROUTES.BROWSE)
          }
          if (this._isMounted) {
            this.setState({ loaded: true })
          }
        },
        (authUser = null) => {
          if (condition(authUser) === 'public') {
            if (this._isMounted) {
              this.setState({ loaded: true })
            }
          }
          else {
            this.props.history.push(ROUTES.SIGN_IN)
          }
        }
      )
    }

    componentWillUnmount() {
      this._isMounted = false;
      this.listener()
    }
    
    render() {
      if (!this.state.loaded) { // okay way of handling public route redirects
        return null
      }

      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      )
    }
  }
  
  return compose(
    withRouter,
    withFirebase,
  )(WithAuthorization)
}

export default withAuthorization