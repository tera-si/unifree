export const actionSetSelectedUser = ( userId, username ) => {
  return {
    type: "SET_SELECTED_USER",
    data: { user: {
      userId,
      username
    }}
  }
}

export const actionClearSelectedUser = () => {
  return {
    type: "CLEAR_SELECTED_USER",
  }
}

const reducer = (state = { userId: null, username: null }, action) => {
  switch (action.type) {
    case "SET_SELECTED_USER":
      return action.data.user
    case "CLEAR_SELECTED_USER":
      return {
        userId: null,
        username: null
      }
    default:
      return state
  }
}

export default reducer
