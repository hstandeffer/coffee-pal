import React from 'react';

const AuthUserContext = React.createContext({
  isLoggedIn: false,
  user: {},
  login: () => {},
  logout: () => {}
});

export default AuthUserContext;