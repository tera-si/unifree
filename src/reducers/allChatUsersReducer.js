/**
 * Expect an array of {userId, username} objects as argument
 * @param {*} allUsers
 * @returns
 */
export const actionSetAllUsers = (allUsers) => {
  return {
    type: "SET_ALL_CHAT_USERS",
    data: allUsers
  }
}

/**
 * Expect an {userId, username} object as argument
 * @param {*} newUser
 * @returns
 */
export const actionConcatNewUser = (newUser) => {
  return {
    type: "CONCAT_NEW_CHAT_USER",
    data: newUser
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ALL_CHAT_USERS":
      return action.data
    case "CONCAT_NEW_CHAT_USER":
      return [...state, action.data]
    default:
      return state
  }
}

export default reducer
