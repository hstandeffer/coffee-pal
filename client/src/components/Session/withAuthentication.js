import React, { useState } from 'react'

import AuthUserContext from './context'

const withAuthentication = Component => props => {
  const [authUser, setAuthUser] = useState(null)

  const setUser = (newUser) => {
    setAuthUser(newUser)
  }
    
  return (
    <AuthUserContext.Provider value={authUser}>
      <Component {...props} setUser={(newUser) => setUser(newUser)} />
    </AuthUserContext.Provider>
  )
}

export default withAuthentication