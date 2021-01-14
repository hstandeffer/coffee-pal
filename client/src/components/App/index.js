import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navigation from '../Navigation'
import LandingPage from '../Landing'
import SignUpPage from '../SignUp'
import SignInPage from '../SignIn'
import PasswordForget from '../PasswordForget'
import PasswordReset from '../PasswordReset'
import AccountPage from '../Profile/Account'
import { SavedCoffees } from '../Profile/Saved'
import ProfilePage from '../Profile'
// import AdminPage from '../Admin'
import BrowsePage from '../Search'
import TastingPage from '../Tasting'
import ProductTastingPage from '../Tasting/ProductTasting'
import ProductPage from '../Product'
import CoffeeEditPage from '../Coffee/Edit'
import AddCoffeePage from '../Coffee/Add'
import RoasterPage from '../Roaster'
import AddRoasterPage from '../Roaster/Add'
import ViewRoasterPage from '../Roaster/View'

import Layout from '../../shared/layouts/Profile'

import * as ROUTES from '../../constants/routes'
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
        <Switch>
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
          <Route path={ROUTES.PASSWORD_RESET} component={PasswordReset} />
          <RouteWrapper exact path={ROUTES.PROFILE} component={ProfilePage} layout={Layout} />
          <RouteWrapper path={ROUTES.ACCOUNT} component={AccountPage} layout={Layout} />
          <RouteWrapper path={ROUTES.SAVED_COFFEES} component={SavedCoffees} layout={Layout} />
          {/* <Route path={ROUTES.ADMIN} component={AdminPage} /> */}
          <Route path={ROUTES.BROWSE} component={BrowsePage} />
          <Route exact path={ROUTES.COFFEE_EDIT} component={CoffeeEditPage} />
          <Route exact path={ROUTES.TASTINGS} component={TastingPage} />
          <Route path={ROUTES.PRODUCT_TASTING} component={ProductTastingPage} />
          <Route path={ROUTES.ADD_COFFEE} component={AddCoffeePage} />
          <Route exact path={ROUTES.ROASTERS} component={RoasterPage} />
          <Route path={ROUTES.ADD_ROASTERS} component={AddRoasterPage} />
          <Route path={ROUTES.VIEW_ROASTER} component={ViewRoasterPage} />
          <Route exact path={ROUTES.PRODUCT} component={ProductPage} />
        </Switch>
      </Router>
    )
  }
}

const RouteWrapper = ({
  component: Component, 
  layout: Layout, 
  ...rest
}) => {
  return (
    <Route {...rest} render={(props) =>
      <Layout {...props}>
        <Component {...props} />
      </Layout>
    } />
  )
}

// this wraps the entire app around the authentication context
export default withAuthentication(App)