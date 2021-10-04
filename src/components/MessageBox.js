import React from "react"
import "../styles/MessageBox.css"

const MessageBox = ({ message, isReceived }) => {
  const type = isReceived ? "receivedMessageBox" : "sentMessageBox"

  return (
    <div className={type}>
        <div>
          <p className="messageDateText">{`${message.dateSent.toLocaleString()}`}</p>
        </div>
        <div className="messageContentBox">
          <p>{message.content}</p>
        </div>
    </div>
  )
}

export default MessageBox
