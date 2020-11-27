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
import ProductTastingPage from '../Tasting/ProductTasting'
import ProductPage from '../Product'
import AddCoffeePage from '../Coffee/Add'
import RoasterPage from '../Roaster'
import AddRoasterPage from '../Roaster/Add'
import ViewRoasterPage from '../Roaster/View'

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
        <Navigation /> 

        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.PROFILE} component={ProfilePage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        <Route path={ROUTES.BROWSE} component={BrowsePage} />
        <Route path={ROUTES.PRODUCT} component={ProductPage} />
        <Route path={ROUTES.SEARCH} component={SearchPage} />
        <Route exact path={ROUTES.TASTINGS} component={TastingPage} />
        <Route path={ROUTES.PRODUCT_TASTING} component={ProductTastingPage} />
        <Route path={ROUTES.ADD_COFFEE} component={AddCoffeePage} />
        <Route exact path={ROUTES.ROASTERS} component={RoasterPage} />
        <Route path={ROUTES.ADD_ROASTERS} component={AddRoasterPage} />
        <Route path={ROUTES.VIEW_ROASTER} component={ViewRoasterPage} />
      </Router>
    )
  }
}

// this wraps the entire app around the authentication context so the authUser object is always available on auth state change
export default withAuthentication(App)