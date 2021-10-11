import store from "./store"
import { actionSetAllMessages, actionConcatNewMessage } from "./reducers/allChatMessageReducer"
import { actionSetAllUsers, actionConcatNewUser } from "./reducers/allChatUsersReducer"
import { actionHasNewMessage } from "./reducers/hasNewMessageReducer"

//! Cannot use `useSelector()` and `useDispatch()` here because of not being
//! a React component. Has to access the store directly
export const handleFetchAllMessages = ({ messages }) => {
  const auth = store.getState()["auth"]
  const allMessages = []
  const allUsers = []

  const _idIndex = (userId) => {
    for (let i = 0; i < allUsers.length; i++) {
      const user = allUsers[i]

      if (user.userId === userId) {
        return i
      }
    }

    return -1
  }

  for (const array of messages) {
    for (const message of array) {
      allMessages.push({ ...message, dateSent: new Date(message.dateSent) })

      if (message.sentFrom.id !== auth.id) {
        if (_idIndex(message.sentFrom.id) === -1) {
          allUsers.push({
            userId: message.sentFrom.id,
            username: message.sentFrom.username
          })
        }

        if (message.newMessage) {
          store.dispatch(actionHasNewMessage(message.sentFrom.id))
        }
      }

      if (message.sentTo.id !== auth.id) {
        if (_idIndex(message.sentTo.id) === -1) {
          allUsers.push({
            userId: message.sentTo.id,
            username: message.sentTo.username
          })
        }

        if (message.newMessage) {
          store.dispatch(actionHasNewMessage(message.sentTo.id))
        }
      }
    }
  }

  store.dispatch(actionSetAllMessages(allMessages))
  store.dispatch(actionSetAllUsers(allUsers))
}

// TODO: dispatch notification when new message is received
export const handlePrivateMessage = ({ message }) => {
  const auth = store.getState()["auth"]
  alert("new message received!")

  const newMessage = {...message, dateSent: new Date(message.dateSent)}

  if (message.sentFrom.id !== auth.id) {
    store.dispatch(actionConcatNewUser({
      userId: message.sentFrom.id,
      username: message.sentFrom.username
    }))

    store.dispatch(actionHasNewMessage(message.sentFrom.id))
  }

  if (message.sentTo.id !== auth.id) {
    store.dispatch(actionConcatNewUser({
      userId: message.sentTo.id,
      username: message.sentTo.username
    }))

    store.dispatch(actionHasNewMessage(message.sentTo.id))
  }

  store.dispatch(actionConcatNewMessage(newMessage))
}
