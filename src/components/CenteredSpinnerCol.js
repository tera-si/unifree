import React from "react"
import { Col, Row, Spinner } from "react-bootstrap"
import "../styles/CenteredSpinnerCol.css"

const CenteredSpinnerCol = () => {
  return (
    <Row>
      <Col className="spinnerCol">
        <Spinner animation="border" role="status" variant="primary">
          <span className="hidden">loading...</span>
        </Spinner>
      </Col>
    </Row>
  )
}
export default CenteredSpinnerCol
