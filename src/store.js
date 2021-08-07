import { createStore, combineReducers } from "redux"
import authReducer from "./reducers/authReducer"

const reducers = combineReducers({
  auth: authReducer
})

const store = createStore(reducers)

export default store
