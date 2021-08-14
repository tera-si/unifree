import axios from "axios"
const BASE_URI = "/api/users"

const register = async (credentials) => {
  const response = await axios.post(BASE_URI, credentials)
  return response.data
}

const userService = {
  register
}

export default userService
