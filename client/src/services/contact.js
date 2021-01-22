import axios from 'axios'

const baseUrl = '/api/contact'

const send = async (email, message) => {
  const contactObj = {
    email: email,
    message: message
  }
  const response = await axios.post(`${baseUrl}`, contactObj)
  return response.data
}

export default { send }