import React, { useState, useContext, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import AuthUserContext from '../Session/context'

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
import NotFoundPage from '../../shared/components/404'
import Footer from '../Footer'

import Layout from '../../shared/layouts/Profile'

import * as ROUTES from '../../constants/routes'
import { withAuthentication } from '../Session'

const App = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) {
    return null
  }
  
  return (
    <Router>
      <Navigation /> 
      <Switch>
        <PrivateRouteWrapper exact path={ROUTES.PROFILE} component={ProfilePage} layout={Layout} />
        <PrivateRouteWrapper path={ROUTES.ACCOUNT} component={AccountPage} layout={Layout} />
        <PrivateRouteWrapper path={ROUTES.SAVED_COFFEES} component={SavedCoffees} layout={Layout} />

        <PrivateRoute exact path={ROUTES.COFFEE_EDIT} component={CoffeeEditPage} />
        <PrivateRoute exact path={ROUTES.TASTINGS} component={TastingPage} />
        <PrivateRoute path={ROUTES.PRODUCT_TASTING} component={ProductTastingPage} />
        <PrivateRoute path={ROUTES.ADD_COFFEE} component={AddCoffeePage} />
        <PrivateRoute path={ROUTES.ADD_ROASTERS} component={AddRoasterPage} />
        {/* <Route path={ROUTES.ADMIN} component={AdminPage} /> */}

        <PublicRoute restricted={true} exact path={ROUTES.LANDING} component={LandingPage} />
        <PublicRoute restricted={true} path={ROUTES.SIGN_UP} component={SignUpPage} />
        <PublicRoute restricted={true} path={ROUTES.SIGN_IN} component={SignInPage} />
        <PublicRoute restricted={true} path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
        <PublicRoute restricted={true} path={ROUTES.PASSWORD_RESET} component={PasswordReset} />
        <PublicRoute restricted={false} path={ROUTES.BROWSE} component={BrowsePage} />
        <PublicRoute restricted={false} exact path={ROUTES.ROASTERS} component={RoasterPage} />
        <PublicRoute restricted={false} path={ROUTES.VIEW_ROASTER} component={ViewRoasterPage} />
        <PublicRoute restricted={false} exact path={ROUTES.PRODUCT} component={ProductPage} />
        
        <PublicRoute restricted={false} component={NotFoundPage} />
      </Switch>
      <Footer />
    </Router>
  )
}

const PrivateRoute = ({component: Component, ...rest}) => {
  const authContext = useContext(AuthUserContext)
  return (
    <Route {...rest} render={props => (
        authContext.isLoggedIn ?
            <Component {...props} />
        : <Redirect to={ROUTES.SIGN_IN} />
    )} />
  )
}

const PublicRoute = ({component: Component, restricted, ...rest}) => {
  const authContext = useContext(AuthUserContext)
  return (
      // restricted = false meaning public route
      // restricted = true meaning restricted route
      <Route {...rest} render={props => (
          authContext.isLoggedIn && restricted ?
              <Redirect to={ROUTES.BROWSE} />
          : <Component {...props} />
      )} />
  )
}

const PrivateRouteWrapper = ({
  component: Component, 
  layout: Layout,
  ...rest
}) => {
  const authContext = useContext(AuthUserContext)
  return (
    <Route {...rest} render={(props) =>
      authContext.isLoggedIn ?
        <Layout {...props}>
          <Component {...props} />
        </Layout>
      : <Redirect to={ROUTES.SIGN_IN} />
    } />
  )
}

// this wraps the entire app around the authentication context
export default withAuthentication(App)