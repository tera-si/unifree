export const actionHasNewMessage = (fromId) => {
  return {
    type: "HAS_NEW_MESSAGE",
    data: fromId
  }
}

export const actionSetMessageRead = (fromId) => {
  return {
    type: "SET_MESSAGE_READ",
    data: fromId
  }
}

export const actionNoNewMessage = () => {
  return {
    type: "NO_NEW_MESSAGE"
  }
}

const _idIndex = (state, userId) => {
  for (let i = 0; i < state.length; i++) {
    if (state[i] === userId) {
      return i
    }
  }

  return -1
}

const reducer = (state = { hasNew: false, fromWho: [] }, action) => {
  switch (action.type) {
    case "HAS_NEW_MESSAGE":
      const index = _idIndex(state.fromWho, action.data)

      if (index === -1) {
        return {
          hasNew: true,
          fromWho: state.fromWho.concat(action.data)
        }
      }

      return state
    case "SET_MESSAGE_READ":
      const newState = state.fromWho.filter(id => id !== action.data)

      if (newState.length <= 0) {
        return {
          hasNew: false,
          fromWho: []
        }
      }

      return {
        hasNew: true,
        fromWho: newState
      }
    case "NO_NEW_MESSAGE":
      return {
        hasNew: false,
        fromWho: []
      }
    default:
      return state
  }
}

export default reducer
