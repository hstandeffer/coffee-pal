import React, { useState, useEffect } from 'react'

import AuthUserContext from './context'

const withAuthentication = Component => props => {
  const [token, setToken] = useState(null)
    const login = (tokenVal) => {
      setToken(tokenVal)
      const expirationTime = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30).toISOString()

      localStorage.setItem('loggedUser', JSON.stringify({ tokenVal, expirationTime}))

    }
    const logout = () => {
      setToken(null)
      localStorage.removeItem('loggedUser')
    }

    useEffect(() => {
      const savedUser = JSON.parse(localStorage.getItem('loggedUser'))
      if (savedUser && savedUser.tokenVal) {
        login(savedUser.tokenVal)
      }
    }, [])
    
  return (
    <AuthUserContext.Provider value={{ isLoggedIn: !!token, login: login, logout: logout }}>
      <Component {...props} />
    </AuthUserContext.Provider>
  )
}

export default withAuthentication