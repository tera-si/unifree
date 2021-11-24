import React, { createRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Accordion, Button, Form, Row, Col } from "react-bootstrap"
import CardWrapper from "./CardWrapper"
import LabelledInputRow from "./LabelledInputRow"
import { conditions, categories } from "../static/itemInfo"
import { invalidSearchParams, searchParamsIsEqual, filterEmptyField } from "../utils/searchParamsUtils"
import { actionSetErrorNotice } from "../reducers/notificationReducer"
import { actionSetSearchParams } from "../reducers/searchParamsReducer"
import "../styles/SearchItem.css"

const SearchItem = () => {
  const dispatch = useDispatch()
  const searchParams = useSelector(state => state.searchParams)

  const refs = {
    name: createRef(),
    category: createRef(),
    condition: createRef(),
    shipping: createRef(),
    meet: createRef()
  }

  useEffect(() => {
    if (
      refs.name.current && refs.category.current &&
      refs.condition.current && refs.shipping.current &&
      refs.meet.current
    ) {
      refs.name.current.value = searchParams.name || ""
      refs.category.current.value = searchParams.category || "any"
      refs.condition.current.value = searchParams.condition || "any"

      if (searchParams.shipping !== undefined && searchParams.shipping !== null) {
        refs.shipping.current.checked = searchParams.shipping
      }
      else {
        refs.shipping.current.checked = true
      }

      if (searchParams.meet !== undefined && searchParams.meet !== null) {
        refs.meet.current.checked = searchParams.meet
      }
      else {
        refs.meet.current.checked = true
      }
    }
  }, [refs.name, refs.category, refs.condition, refs.meet, refs.shipping, searchParams])

  const handleSearchButton = (event) => {
    event.preventDefault()

    let params = {
      name: refs.name.current.value,
      category: refs.category.current.value,
      condition: refs.condition.current.value,
      shipping: refs.shipping.current.checked,
      meet: refs.meet.current.checked
    }

    if (
      searchParamsIsEqual(invalidSearchParams.default, params) ||
      searchParamsIsEqual(invalidSearchParams.allNull, params) ||
      searchParamsIsEqual(invalidSearchParams.allUndefined, params)
    ) {
      dispatch(actionSetErrorNotice("Error: invalid search parameters"))
      return
    }

    params = filterEmptyField(params)

    if (!params.shipping && !params.meet) {
      dispatch(actionSetErrorNotice("Error: at least one exchange method must be checked"))
      return
    }

    dispatch(actionSetSearchParams(params))
  }

  return (
    <CardWrapper cardHeader="Search item">
      <LabelledInputRow
        type="text"
        label="Item name"
        ref={refs.name}
      />
      <Accordion className="accordionBase">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Apply filters</Accordion.Header>
          <Accordion.Body>
            <Form.Group as={Row} className="inputRow">
              <Col sm="3">
                <Form.Label>Category</Form.Label>
              </Col>
              <Col sm="9">
                <Form.Select ref={refs.category} className="selectField">
                  <option value="any" key="anyCategory">Any</option>
                  {categories.map(category =>
                    <option key={category} value={category}>{category}</option>
                  )}
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="inputRow">
              <Col sm="3">
                <Form.Label>Condition</Form.Label>
              </Col>
              <Col sm="9">
                <Form.Select ref={refs.condition} className="selectField">
                  <option value="any" key="anyCondition">Any</option>
                  {conditions.map(condition =>
                    <option key={condition} value={condition}>{condition}</option>
                  )}
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="inputRow">
              <Col sm="9">
                <Form.Label>Exchange method</Form.Label>
              </Col>
              <Col sm="3">
                <Form.Check
                  inline
                  name="exchange method"
                  type="checkbox"
                  label="mail/ship"
                  className="checkBoxOption"
                  ref={refs.shipping}
                />
                <Form.Check
                  inline
                  name="exchange method"
                  type="checkbox"
                  label="meet"
                  className="checkBoxOption"
                  ref={refs.meet}
                />
              </Col>
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Button type="null" className="searchButton" onClick={handleSearchButton}>Search</Button>
    </CardWrapper>
  )
}

export default SearchItem
