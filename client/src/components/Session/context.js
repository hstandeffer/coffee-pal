import React from 'react';

const AuthUserContext = React.createContext({
  isLoggedIn: false,
  token: null,
  login: () => {},
  logout: () => {}
});

export default AuthUserContext;