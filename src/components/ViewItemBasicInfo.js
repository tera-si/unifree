import React from "react"
import { Table } from "react-bootstrap"
import CardWrapper from "./CardWrapper"
import "../styles/ViewItemBasicInfo.css"

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
      <Table responsive hover size="sm" borderless className="infoTable">
        <thead className="tableHeaderRow">
          <tr>
            <th>Category</th>
            <th>Condition</th>
            <th>Exchange method</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{category}</td>
            <td>{condition}</td>
            <td>{exchangeMethod}</td>
          </tr>
        </tbody>
      </Table>
    </CardWrapper>
  )
}

export default ViewItemBasicInfo
