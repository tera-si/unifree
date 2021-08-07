import React from "react"
import { Card } from "react-bootstrap"

const CardWrapper = (props) => {
  return (
    <Card>
      {!props.cardHeader
        ? null
        : <Card.Header>{props.cardHeader}</Card.Header>
      }
      <Card.Body>
        {props.children}
      </Card.Body>
      {!props.cardFooter
        ? null
        : <Card.Footer>{props.cardFooter}</Card.Footer>
      }
    </Card>
  )
}

export default CardWrapper
