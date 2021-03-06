import React, { useState, useEffect } from 'react'
import { getStoredAuthToken, storeAuthToken, removeStoredAuthToken } from '../../shared/utils/authToken'
import AuthUserContext from './context'
import axios from 'axios'

const withAuthentication = Component => props => {
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  const login = (userObj) => {
    storeAuthToken(userObj.token)
    setToken(userObj.token)
  }
  const logout = () => {
    removeStoredAuthToken()
    setToken(null)
  }

  useEffect(() => {
    setLoading(true)
    let tokenVal = getStoredAuthToken()
    if (tokenVal !== 'undefined' && tokenVal !== null) {
      axios.post('/api/auth/verify', { token: tokenVal })
        .then(response => {
          const userObj = { token: tokenVal, id: response.data.id }
          login(userObj)
        })
        .catch(err => {
          logout()
        })
        .finally(() => {
          setLoading(false)
        })
    }
    else {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return null
  }
    
  return (
    <AuthUserContext.Provider value={{ isLoggedIn: !!token, login: login, logout: logout }}>
      <Component {...props} />
    </AuthUserContext.Provider>
  )
}

export default withAuthentication