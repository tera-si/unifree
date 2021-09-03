import React from "react"
import { Col, Row } from "react-bootstrap"
import CardWrapper from "./CardWrapper"

const ViewItemBasicInfo = ({ category, condition, shipping, meet }) => {
  let exchangeMethod = undefined
  if (shipping && meet) {
    exchangeMethod = "mail/ship, meet"
  }
  else if (shipping) {
    exchangeMethod = "mail/ship"
  }
  else if (meet) {
    exchangeMethod = "meet"
  }

  return (
    <CardWrapper cardHeader="Basic Info">
      <Row>
        <Col>
          Category
        </Col>
        <Col>
          Condition
        </Col>
        <Col>
          Exchange method
        </Col>
      </Row>
      <Row>
        <Col>{category}</Col>
        <Col>{condition}</Col>
        <Col>{exchangeMethod}</Col>
      </Row>
    </CardWrapper>
  )
}

export default ViewItemBasicInfo
