import React, { createRef, useEffect } from "react"
import { Accordion, Button, Form, Row, Col } from "react-bootstrap"
import LabelledInputRow from "./LabelledInputRow"
import { conditions, categories } from "../static/itemInfo"

const SearchItem = () => {
  const refs = {
    name: createRef(),
    category: createRef(),
    condition: createRef(),
    shipping: createRef(),
    meet: createRef()
  }

  useEffect(() => {
    refs.shipping.current.checked = true
    refs.meet.current.checked = true
  }, [refs.meet, refs.shipping])

  return (
    <div>
      <LabelledInputRow
        type="text"
        label="Search item"
        placeholder="Item name"
        ref={refs.name}
      />
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Apply filters</Accordion.Header>
          <Accordion.Body>
            <Form.Group as={Row}>
              <Col sm="3">
                <Form.Label>Category</Form.Label>
              </Col>
              <Col sm="9">
                <Form.Select ref={refs.category}>
                  <option hidden value={-1} key="blankChoice">
                    Any
                  </option>
                  {categories.map(category =>
                    <option key={category} value={category}>{category}</option>
                  )}
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col sm="3">
                <Form.Label>Condition</Form.Label>
              </Col>
              <Col sm="9">
                <Form.Select ref={refs.condition}>
                  <option hidden value={-1} key="blankChoice">Any</option>
                  {conditions.map(condition =>
                    <option key={condition} value={condition}>{condition}</option>
                  )}
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col sm="9">
                <Form.Label>Exchange method</Form.Label>
              </Col>
              <Col sm="3">
                <Form.Check
                  inline
                  name="exchange method"
                  type="checkbox"
                  label="mail/ship"
                  ref={refs.shipping}
                />
                <Form.Check
                  inline
                  name="exchange method"
                  type="checkbox"
                  label="meet"
                  ref={refs.meet}
                />
              </Col>
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Button type="null">Search</Button>
    </div>
  )
}

export default SearchItem
