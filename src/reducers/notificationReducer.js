let timeoutID = undefined

export const actionSetSuccessNotice = (newNotice) => {
  if (timeoutID) {
    clearTimeout(timeoutID)
  }

  return async dispatch => {
    await dispatch({
      type: "SET_SUCCESS",
      data: { notice: newNotice }
    })

    timeoutID = setTimeout(() => dispatch(actionClearNotice()), 5000)
  }
}

export const actionSetErrorNotice = (newError) => {
  if (timeoutID) {
    clearTimeout(timeoutID)
  }

  return async dispatch => {
    await dispatch({
      type: "SET_ERROR",
      data: { notice: newError }
    })

    timeoutID = setTimeout(() => dispatch(actionClearNotice()), 5000)
  }
}

export const actionSetInfoNotice = (newInfo) => {
  if (timeoutID) {
    clearTimeout(timeoutID)
  }

  return async dispatch => {
    await dispatch({
      type: "SET_INFO",
      data: { notice: newInfo}
    })

    timeoutID = setTimeout(() => dispatch(actionClearNotice()), 5000)
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
    case "SET_INFO":
      return {
        text: action.data.notice,
        variant: "info"
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
