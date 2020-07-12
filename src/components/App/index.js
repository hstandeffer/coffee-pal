import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import ProfilePage from '../Profile';
import SearchPage from '../Search'

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session'

import styled from 'styled-components'

const StyledDiv = styled.div`
  /* background-color: #CEB784; */
  background: #28445b;
`

const App = () => (
  <Router>
    <div>
      <StyledDiv>
        <Navigation /> 
      </StyledDiv>

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.PROFILE} component={ProfilePage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route path={ROUTES.SEARCH} component={SearchPage} />
    </div>
  </Router>
)

// this wraps the entire app around the authentication context so the authUser object is always available on auth state change
export default withAuthentication(App)