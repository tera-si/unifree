import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import authReducer from "./reducers/authReducer"
import notificationReducer from "./reducers/notificationReducer"
import selectedUserReducer from "./reducers/selectedUserReducer"
import selectedItemReducer from "./reducers/selectedItemReducer"
import allChatUsersReducer from "./reducers/allChatUsersReducer"
import allChatMessageReducer from "./reducers/allChatMessageReducer"
import hasNewMessageReducer from "./reducers/hasNewMessageReducer"

const reducers = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  selectedUser: selectedUserReducer,
  selectedItem: selectedItemReducer,
  allChatUsers: allChatUsersReducer,
  allChatMessages: allChatMessageReducer,
  hasNewMessage: hasNewMessageReducer,
})

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
