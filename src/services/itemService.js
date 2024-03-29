import axios from "axios"
const BASE_URL = "/api/items"

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(BASE_URL)
  return response.data
}

const getItem = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`)
  return response.data
}

const postNew = async (newItem) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(BASE_URL, newItem, config)
  return response.data
}

const putUpdate = async (id, updatedItem) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(`${BASE_URL}/${id}`, updatedItem, config)
  return response.data
}

const deleteWithID = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  await axios.delete(`${BASE_URL}/${id}`, config)
}

const itemService = {
  setToken,
  getAll,
  getItem,
  postNew,
  putUpdate,
  deleteWithID
}

export default itemService
