import { io } from "socket.io-client"

//! change this in production
const URL = `${process.env.REACT_APP_BACKEND_ADDRESS}:5000`
const socket = io(URL, { autoConnect: false })

export default socket
