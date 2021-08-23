import axios from "axios"
const BASE_URL = "/api/items"

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const postNew = async (newItem) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(BASE_URL, newItem, config)
  return response.data
}

const itemService = {
  setToken,
  postNew
}

export default itemService
