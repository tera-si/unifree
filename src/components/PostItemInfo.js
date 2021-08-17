import React, { forwardRef } from "react"
import { Row, Col, Form } from "react-bootstrap"
import CardWrapper from "./CardWrapper"
import LabelledInputRow from "./LabelledInputRow"

const PostItemInfo = forwardRef((props, ref) => {
  return (
    <CardWrapper cardHeader="Basic info of item">
      <LabelledInputRow
        label="Item name"
        type="text"
      />
      {/* category */}
      {/* condition */}
      {/* mail/ship or meet */}
      <Row>
        <Col sm="3">
          <Form.Label>Exchange method</Form.Label>
        </Col>
        <Col sm="9">
          <Form.Check inline name="exchange_method" type="checkbox" label="mail/ship" />
          <Form.Check inline name="exchange_method" type="checkbox" label="meet" />
        </Col>
      </Row>
      {/* description (here or in PostItem.js) */}
    </CardWrapper>
  )
})

export default PostItemInfo
