/**
 * expects an array of {dateSent, sentFrom, content, sentTo, newMessage} objects
 * @param {*} allMessages
 * @returns
 */
export const actionSetAllMessages = (allMessages) => {
  return {
    type: "SET_ALL_CHAT_MESSAGES",
    data: allMessages
  }
}

/**
 * expects an {dateSent, sentFrom, content, sentTo, newMessage} object
 * @param {*} newMessage
 * @returns
 */
export const actionConcatNewMessage = (newMessage) => {
  return {
    type: "CONCAT_NEW_CHAT_MESSAGE",
    data: newMessage
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ALL_CHAT_MESSAGES":
      return action.data
    case "CONCAT_NEW_CHAT_MESSAGE":
      return [...state, action.data]
    default:
      return state
  }
}

export default reducer
