import store from "./store"
import { actionSetAllMessages, actionConcatNewMessage } from "./reducers/allChatMessageReducer"
import { actionSetAllUsers, actionConcatNewUser } from "./reducers/allChatUsersReducer"
import { actionHasNewMessage } from "./reducers/hasNewMessageReducer"
import { actionSetInfoNotice } from "./reducers/notificationReducer"

//! Cannot use `useSelector()` and `useDispatch()` here because of not being
//! a React component. Has to access the store directly
export const handleFetchAllMessages = ({ messages }) => {
  const auth = store.getState()["auth"]
  const allMessages = []
  const allUsers = []
  let hasNew = false

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

        if (!message.readByReceiver) {
          store.dispatch(actionHasNewMessage(message.sentFrom.id))
          hasNew = true
        }
      }

      if (message.sentTo.id !== auth.id) {
        if (_idIndex(message.sentTo.id) === -1) {
          allUsers.push({
            userId: message.sentTo.id,
            username: message.sentTo.username
          })
        }
      }
    }
  }

  if (hasNew) {
    store.dispatch(actionSetInfoNotice(`You have unread messages`))
  }

  store.dispatch(actionSetAllMessages(allMessages))
  store.dispatch(actionSetAllUsers(allUsers))
}

export const handlePrivateMessage = ({ message }) => {
  const auth = store.getState()["auth"]

  const newMessage = { ...message, dateSent: new Date(message.dateSent) }
  const hash = window.location.hash.substring(1)

  if (message.sentFrom.id !== auth.id) {
    store.dispatch(actionConcatNewUser({
      userId: message.sentFrom.id,
      username: message.sentFrom.username
    }))

    if (message.sentFrom.id !== hash) {
      store.dispatch(actionHasNewMessage(message.sentFrom.id))
    }

    store.dispatch(actionSetInfoNotice(`New message from ${message.sentFrom.username} received`))
  }

  if (message.sentTo.id !== auth.id) {
    store.dispatch(actionConcatNewUser({
      userId: message.sentTo.id,
      username: message.sentTo.username
    }))

    if (message.sentTo.id !== hash) {
      store.dispatch(actionHasNewMessage(message.sentTo.id))
    }

    store.dispatch(actionSetInfoNotice(`New message from ${message.sentTo.username} received`))
  }

  store.dispatch(actionConcatNewMessage(newMessage))
}
