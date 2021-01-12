import React, { useState, useEffect } from 'react'
import { getStoredAuthToken, storeAuthToken, removeStoredAuthToken } from '../../shared/utils/authToken'

import AuthUserContext from './context'

const withAuthentication = Component => props => {
  const [token, setToken] = useState(null)

  const login = (tokenVal) => {
    setToken(tokenVal)
    storeAuthToken(tokenVal)
  }
  const logout = () => {
    setToken(null)
    removeStoredAuthToken()
  }

  useEffect(() => {
    const tokenVal = getStoredAuthToken()
    if (tokenVal) {
      login(tokenVal)
    }
  }, [])
    
  return (
    <AuthUserContext.Provider value={{ isLoggedIn: !!token, login: login, logout: logout }}>
      <Component {...props} />
    </AuthUserContext.Provider>
  )
}

export default withAuthentication