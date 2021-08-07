import React, { forwardRef } from "react"
import { Form, Row, Col } from "react-bootstrap"

const LabelledInputRow = forwardRef((props, ref) => {
  return (
    <Form.Group as={Row}>
      <Form.Label column sm="2">{props.label}</Form.Label>
        <Col sm="10">
          <Form.Control type={props.type} placeholder={props.placeholder} ref={ref} />
        </Col>
    </Form.Group>
  )
})

export default LabelledInputRow
