export const searchParamsIsEqual = (param1, param2) => {
  return (
    param1.name === param2.name && param1.category === param2.category &&
    param1.condition === param2.condition && param1.shipping === param2.shipping &&
    param1.meet === param2.meet
  )
}

export const invalidSearchParams = {
  default: {
    name: "",
    category: "any",
    condition: "any",
    shipping: true,
    meet: true
  },
  allNull: {
    name: null,
    category: null,
    condition: null,
    shipping: null,
    meet: null
  },
  allUndefined: {
    name: undefined,
    category: undefined,
    condition: undefined,
    shipping: undefined,
    meet: undefined
  }
}

export const filterEmptyField = (params) => {
  if (params.name === "" || !params.name) {
    delete params.name
  }

  if (params.category === "any" || !params.category) {
    delete params.category
  }

  if (params.condition === "any" || !params.condition) {
    delete params.condition
  }

  if (params.shipping === null || params.shipping === undefined) {
    delete params.shipping
  }

  if (params.meet === null || params.meet === undefined) {
    delete params.meet
  }

  return params
}
