import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import authReducer from "./reducers/authReducer"
import notificationReducer from "./reducers/notificationReducer"

const reducers = combineReducers({
  auth: authReducer,
  notification: notificationReducer
})

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
