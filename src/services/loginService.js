import axios from "axios"
const BASE_URI = "/api/login"

const login = async (credentials) => {
  const response = await axios.post(BASE_URI, credentials)
  return response.data
}

const loginService = {
  login
}

export default loginService
