import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Card, Table } from "react-bootstrap"
import CardWrapper from "./CardWrapper"
import CenteredSpinnerCol from "./CenteredSpinnerCol"
import tradeHistoryService from "../services/tradeHistoryService"
import { actionSetErrorNotice } from "../reducers/notificationReducer"
import "../styles/TradeHistory.css"

const TradeHistory = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const [loading, setLoading] = useState(true)
  const [historyEntries, setHistoryEntries] = useState(null)
  const isSmallScreen = window.innerWidth <= 700

  useEffect(() => {
    const getAllHistoryEntries = async () => {
      let response = null
      try {
        response = await tradeHistoryService.getAll()
      }
      catch (e) {
        dispatch(actionSetErrorNotice("Error: unable to retrieve trade history"))
      }

      setHistoryEntries(response)
      setLoading(false)
    }

    getAllHistoryEntries()
  }, [dispatch])

  if (loading || !historyEntries) {
    return (
      <CardWrapper>
        <Card.Title>Trade History</Card.Title>
        <CenteredSpinnerCol />
      </CardWrapper>
    )
  }

  if (historyEntries.length <= 0) {
    return (
      <CardWrapper>
        <Card.Title>Trade History</Card.Title>
        <Card.Text>There are currently no entries in your trade history</Card.Text>
      </CardWrapper>
    )
  }

  if (isSmallScreen) {
    return (
      <CardWrapper>
        <Card.Title className="tradeHistoryTitle">Trade History</Card.Title>
        {historyEntries.map(entry =>
          <Table bordered hover key={entry.id} className="entryBaseSmall">
            <tbody>
              <tr>
                <td className="entryHeaderSmall"><strong>Date Traded</strong></td>
                <td>{new Date(entry.dateDelisted).toLocaleString()}</td>
              </tr>
              <tr>
                <td><strong>Item Owner</strong></td>
                <td>
                  {entry.itemOwner.id === auth.id
                    ? "You"
                    : <Link to={`/view_profile/${entry.itemOwner.id}`} className="userLink">
                      {entry.itemOwner.username}
                    </Link>
                  }
                </td>
              </tr>
              <tr>
                <td><strong>Item Name</strong></td>
                <td>{entry.item.name}</td>
              </tr>
              <tr>
                <td><strong>Traded User</strong></td>
                <td>
                  {entry.tradedWith.id === auth.id
                    ? "You"
                    : <Link to={`/view_profile/${entry.tradedWith.username}`} className="userLink">
                      {entry.tradedWith.username}
                    </Link>
                  }
                </td>
              </tr>
            </tbody>
          </Table>
        )}
      </CardWrapper>
    )
  }

  return (
    <CardWrapper>
      <Card.Title className="tradeHistoryTitle">Trade History</Card.Title>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Date Traded</th>
            <th>Item Owner</th>
            <th>Item Name</th>
            <th>Traded User</th>
          </tr>
        </thead>
        <tbody>
          {historyEntries.map(entry =>
            <tr key={entry.id}>
              <td>{new Date(entry.dateDelisted).toLocaleString()}</td>
              <td>
                {entry.itemOwner.id === auth.id
                  ? "You"
                  : <Link to={`/view_profile/${entry.itemOwner.id}`} className="userLink">
                    {entry.itemOwner.username}
                  </Link>
                }
              </td>
              <td>{entry.item.name}</td>
              <td>
                {entry.tradedWith.id === auth.id
                  ? "You"
                  : <Link to={`/view_profile/${entry.tradedWith.id}`} className="userLink">
                    {entry.tradedWith.username}
                  </Link>
                }
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </CardWrapper>
  )
}

export default TradeHistory
