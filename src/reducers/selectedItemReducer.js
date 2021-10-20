let timeoutID = undefined

export const actionSetSelectedItem = ( itemId, itemName ) => {
  if (timeoutID) {
    clearTimeout(timeoutID)
  }

  return async dispatch => {
    await dispatch({
      type: "SET_SELECTED_ITEM",
      data: { item: {
        itemId,
        itemName
      }}
    })

    timeoutID = setTimeout(() => dispatch(actionClearSelectedItem()), 5000)
  }
}

export const actionClearSelectedItem = () => {
  return {
    type: "CLEAR_SELECTED_ITEM",
  }
}

const reducer = (state = { itemId: null, itemName: null }, action) => {
  switch (action.type) {
    case "SET_SELECTED_ITEM":
      return action.data.item
    case "CLEAR_SELECTED_ITEM":
      return {
        itemId: null,
        itemName: null
      }
    default:
      return state
  }
}

export default reducer
