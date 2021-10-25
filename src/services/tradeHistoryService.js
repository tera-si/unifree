import axios from "axios"
const BASE_URL = "/api/tradehistory"

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const postNew = async (newEntry) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(BASE_URL, newEntry, config)
  return response.data
}

const tradeHistoryService = {
  setToken,
  postNew,
}

export default tradeHistoryService
