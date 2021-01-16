import React, { useState, useEffect } from 'react'
import { getStoredAuthToken, storeAuthToken, removeStoredAuthToken } from '../../shared/utils/authToken'
import axios from 'axios'
import AuthUserContext from './context' 

const withAuthentication = Component => props => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState()
  const [loading, setLoading] = useState(true)

  const login = (userObj) => {
    setToken(userObj.token)
    setUserId(userObj.id)
    storeAuthToken(userObj.token)
  }
  const logout = () => {
    setToken(null)
    removeStoredAuthToken()
  }

  useEffect(() => {
    const validateToken = async () => {
      setLoading(true)
      const tokenVal = getStoredAuthToken()
      if (tokenVal !== 'undefined' && tokenVal !== null) {
        const response = await axios.post('/api/auth/verify', { token: tokenVal })
        if (response) {
          const userObj = {token: tokenVal, id: response.data.id}
          login(userObj)
        }
        else {
          logout()
        }
      }
      setLoading(false)
    }
    validateToken()
  }, [])

  if (loading) {
    return null
  }
  // TODO: find way to avoid unauthorized routes showing in nav
    
  return (
    <AuthUserContext.Provider value={{ isLoggedIn: (!!token && !!userId), login: login, logout: logout }}>
      <Component {...props} />
    </AuthUserContext.Provider>
  )
}

export default withAuthentication