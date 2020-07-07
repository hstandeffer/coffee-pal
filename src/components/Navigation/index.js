import React from 'react';
import { StyledLink } from './style'
import StyledSignOutButton from '../SignOut'
import './stylesheet.css'

import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (

  <section className='top-nav'>
    <div>
      <StyledLink to={ROUTES.LANDING}>Logo</StyledLink>
    </div>
    <input id="menu-toggle" type="checkbox" />
    <label className='menu-button-container' htmlFor="menu-toggle">
      <div className='menu-button'></div>
    </label>
    <ul className="menu">
      <li>
        <StyledLink to={ROUTES.HOME}>Home</StyledLink>
      </li>
      <li>
        <StyledLink to={ROUTES.SEARCH}>Search</StyledLink>
      </li>
      <li>
        <StyledLink to={ROUTES.ACCOUNT}>Account</StyledLink>
      </li>
      <li>
        <StyledLink to={ROUTES.PROFILE}>Profile</StyledLink>
      </li>
      <li>
        <StyledSignOutButton />
      </li>
    </ul>
  </section>
);

const NavigationNonAuth = () => (
  <section className='top-nav'>
    <div>
      <StyledLink to={ROUTES.LANDING}>Logo</StyledLink>
    </div>
    <input id="menu-toggle" type="checkbox" />
    <label className='menu-button-container' htmlFor="menu-toggle">
      <div className='menu-button'></div>
    </label>
    <ul className="menu">
      <li>
        <StyledLink to={ROUTES.SIGN_IN}>Sign In</StyledLink>
      </li>
    </ul>
  </section>
)

export default Navigation;