import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import ProfilePage from '../Profile';
import SearchPage from '../Search'
import BrowsePage from '../Browse'
import TastingPage from '../Tasting'

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = { loaded: false }
  }

  componentDidMount() {
    this.setState({ loaded: true })
  }

  render() {
    if (!this.state.loaded) {
      return null
    }
    return (
      <Router>
        <div>
          <Navigation /> 

          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.PROFILE} component={ProfilePage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
          <Route exact path={ROUTES.BROWSE} component={BrowsePage} />
          <Route path={ROUTES.SEARCH} component={SearchPage} />
          <Route path={ROUTES.TASTING} component={TastingPage} />
        </div>
      </Router>
    )
  }
}

// this wraps the entire app around the authentication context so the authUser object is always available on auth state change
export default withAuthentication(App)