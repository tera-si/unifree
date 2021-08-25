import React, { forwardRef } from "react"
import { Row, Col, Form } from "react-bootstrap"
import CardWrapper from "./CardWrapper"
import LabelledInputRow from "./LabelledInputRow"
import "../styles/PostItem.css"

const PostItemInfo = forwardRef((props, ref) => {
  const conditions = [
    "New",
    "New, box opened",
    "New, with defects",
    "Mostly new, rarely used",
    "Good",
    "Visible wear",
    "Damaged",
    "For parts"
  ]

  const categories = [
    "Art/craft supply",
    "Bedroom Accessory",
    "Book",
    "Camera",
    "Clothing",
    "Computer/laptop",
    "Cosmetic/perfume",
    "Decorative/trinket",
    "Fashion accessory",
    "Furniture",
    "Gadget/consumer electronics",
    "Gardening",
    "Home appliance",
    "Kitchenware",
    "Music instrument",
    "Pet supply",
    "Phone",
    "Service",
    "Shoes",
    "Sporting",
    "Stationary",
    "Tablet",
    "Tableware",
    "Toddler/kid supply",
    "Toiletry",
    "Toy/Hobby",
    "Transportation",
    "Video game/console",
    "Other"
  ]

  return (
    <CardWrapper cardHeader="Basic info of item">
      <LabelledInputRow
        label="Item name"
        type="text"
        disabled={props.loading}
        ref={ref.name}
      />
      <Form.Group as={Row} className="inputRow">
          <Col sm="3">
            <Form.Label>Category</Form.Label>
          </Col>
          <Col sm="9">
            <Form.Select ref={ref.category} className="selectField" disabled={props.loading}>
              <option hidden value={-1} key="blankChoice">
                Item category
              </option>
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
            <Form.Select ref={ref.condition} className="selectField" disabled={props.loading}>
              <option hidden value={-1} key="blankChoice">Item condition</option>
              {conditions.map(condition =>
                <option key={condition} value={condition}>{condition}</option>
              )}
            </Form.Select>
          </Col>
      </Form.Group>
      <Form.Group as={Row} className="inputRow">
        <Col sm="6">
          <Form.Label>Exchange method</Form.Label>
        </Col>
        <Col sm="6">
          <Form.Check
            inline
            name="exchange_method"
            type="checkbox"
            label="mail/ship"
            className="checkBoxOption"
            disabled={props.loading}
            ref={ref.shipping}
          />
          <Form.Check
            inline
            name="exchange_method"
            type="checkbox"
            label="meet"
            className="checkBoxOption"
            disabled={props.loading}
            ref={ref.meet}
          />
        </Col>
      </Form.Group>
    </CardWrapper>
  )
})

export default PostItemInfo
