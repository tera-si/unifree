import React, { forwardRef } from "react"
import { Form, Row, Col } from "react-bootstrap"
import "../styles/LabelledInputRow.css"

const LabelledInputRow = forwardRef((props, ref) => {
  return (
    <Form.Group as={Row}>
      <Form.Label column sm="3">{props.label}</Form.Label>
        <Col sm="9">
          <Form.Control type={props.type} placeholder={props.placeholder} disabled={props.disabled} ref={ref} className="inputField" />
        </Col>
    </Form.Group>
  )
})

export default LabelledInputRow
