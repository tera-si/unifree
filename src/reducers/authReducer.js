export const actionSetAuth = (newAuth) => {
  return dispatch => {
    dispatch({
      type: "SET_AUTH",
      data: { auth: newAuth }
    })
  }
}

export const actionClearAuth = () => {
  return dispatch => {
    dispatch({
      type: "CLEAR_AUTH"
    })
  }
}

const authReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_AUTH":
      return action.data.auth
    case "CLEAR_AUTH":
      return null
    default:
      return state
  }
}

export default authReducer
