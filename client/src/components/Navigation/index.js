import React from 'react';
import Navbar from './Navbar'
import { AuthUserContext } from '../Session';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      <Navbar authUser={ authUser ? true : false } />
    }
  </AuthUserContext.Consumer>
)


export default Navigation