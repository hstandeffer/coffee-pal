export const getStoredAuthToken = () => localStorage.getItem('loggedUser')

export const storeAuthToken = token => localStorage.setItem('loggedUser', token)

export const removeStoredAuthToken = () => localStorage.removeItem('loggedUser')