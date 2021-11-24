import { invalidSearchParams } from "../utils/searchParamsUtils"
const emptyState = invalidSearchParams.allUndefined

export const actionSetSearchParams = (params) => {
  return {
    type: "SET_SEARCH_PARAMS",
    data: params
  }
}

export const actionRemoveSearchParams = () => {
  return {
    type: "REMOVE_SEARCH_PARAMS"
  }
}

const reducer = (state = emptyState, action) => {
  switch (action.type) {
    case "SET_SEARCH_PARAMS":
      return action.data
    case "REMOVE_SEARCH_PARAMS":
      return invalidSearchParams.allUndefined
    default:
      return state
  }
}

export default reducer
