import axios from "axios"
const BASE_URL = "/api/tradehistory"

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.get(BASE_URL, config)
  return response.data
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
  getAll,
  postNew,
}

export default tradeHistoryService
