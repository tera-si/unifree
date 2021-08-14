let timeoutID = undefined

export const actionSetSuccessNotice = (newNotice, time) => {
  if (timeoutID) {
    clearTimeout(timeoutID)
  }

  return async dispatch => {
    await dispatch({
      type: "SET_SUCCESS",
      data: { notice: newNotice }
    })

    timeoutID = setTimeout(() => dispatch(actionClearNotice()), time * 1000)
  }
}

export const actionSetErrorNotice = (newError, time) => {
  if (timeoutID) {
    clearTimeout(timeoutID)
  }

  return async dispatch => {
    await dispatch({
      type: "SET_ERROR",
      data: { notice: newError }
    })

    timeoutID = setTimeout(() => dispatch(actionClearNotice()), time * 1000)
  }
}

export const actionClearNotice = () => {
  return ({
    type: "CLEAR_NOTICE"
  })
}

const reducer = (state = { text: null, variant: null }, action) => {
  switch (action.type) {
    case "SET_SUCCESS":
      return {
        text: action.data.notice,
        variant: "success"
      }
    case "SET_ERROR":
      return {
        text: action.data.notice,
        variant: "danger"
      }
    case "CLEAR_NOTICE":
      return {
        text: null,
        variant: null
      }
    default:
      return state
  }
}

export default reducer
