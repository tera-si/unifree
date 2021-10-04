import { io } from "socket.io-client"

//! change this in production
const URL = "http://192.168.1.9:5000"
const socket = io(URL, { autoConnect: false })

export default socket
