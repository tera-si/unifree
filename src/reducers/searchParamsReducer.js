import { invalidSearchParams } from "../utils/searchParamsUtils"
const emptyState = invalidSearchParams.allUndefined

export const actionSetSearchParams = (params) => {
  return {
    type: "SET_SEARCH_PARAMS",
    data: params
  }
}

const reducer = (state = emptyState, action) => {
  switch (action.type) {
    case "SET_SEARCH_PARAMS":
      return action.data
    default:
      return state
  }
}

export default reducer
