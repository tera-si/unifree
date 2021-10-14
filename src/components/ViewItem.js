import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Button, Card, Dropdown, DropdownButton, Row, Col } from "react-bootstrap"
import { useParams, Redirect } from "react-router-dom"
import itemService from "../services/itemService"
import CardWrapper from "./CardWrapper"
import ViewItemHeader from "./ViewItemHeader"
import ItemCarousel from "./ItemCarousel"
import ViewItemBasicInfo from "./ViewItemBasicInfo"
import CenteredSpinnerCol from "./CenteredSpinnerCol"
import { actionSetSelectedUser, actionClearSelectedUser } from "../reducers/selectedUserReducer"
import { actionSetSelectedItem, actionClearSelectedItem } from "../reducers/selectedItemReducer"
import socket from "../socket"
import "../styles/ViewItem.css"
import { actionConcatNewMessage } from "../reducers/allChatMessageReducer"
import { actionConcatNewUser } from "../reducers/allChatUsersReducer"

const ViewItem = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const [redirect, setRedirect] = useState(false)
  const [item, setItem] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    dispatch(actionClearSelectedItem())
    dispatch(actionClearSelectedUser())

    const getItem = async () => {
      const response = await itemService.getItem(id)
      setItem(response)
    }

    getItem()
  }, [id, dispatch])

  if (redirect) {
    return <Redirect push to="/message" />
  }

  if (!item) {
    return (
      <CardWrapper>
        <CenteredSpinnerCol />
      </CardWrapper>
    )
  }

  const dateParsed = new Date(item.datePosted).toLocaleDateString()
  const descriptionParsed = item.description.split("\n")
  const sameUser = auth.id === item.postedBy.id

  // TODO: use modal instead of window popup
  // TODO: ask which user did you traded this item with, by selecting from the
  // recently chatted
  const handleMarkTraded = async () => {
    if (window.confirm("Mark this item as traded?")) {
      const updatedItem = {
        ...item,
        availability: false,
      }

      //? is there anything I need to do with the response ?//
      await itemService.putUpdate(id, updatedItem)
    }
  }

  const handleMessageOwner = () => {
    dispatch(actionSetSelectedUser(item.postedBy.id, item.postedBy.username))
    dispatch(actionSetSelectedItem(id, item.name))

    socket.emit("privateMessage", {
      to: item.postedBy.id,
      content: `Hello, I am interested in ${item.name}`
    })

    const newMessage = {
      dateSent: new Date(),
      sentFrom: {
        id: auth.id,
        username: auth.username
      },
      content: `Hello, I am interested in ${item.name}`,
      sentTo: {
        id: item.postedBy.id,
        username: item.postedBy.username
      },
      readByReceiver: false,
      readBySender: true
    }

    dispatch(actionConcatNewMessage(newMessage))
    dispatch(actionConcatNewUser({
      userId: item.postedBy.id,
      username: item.postedBy.username
    }))

    setRedirect(true)
  }

  return (
    <CardWrapper>
      <ViewItemHeader
        name={item.name}
        dateParsed={dateParsed}
        username={item.postedBy.username}
        userID={item.postedBy.id}
      />
      <ItemCarousel imagePaths={item.imagePaths} />
      <ViewItemBasicInfo
        category={item.category}
        condition={item.condition}
        shipping={item.shipping}
        meet={item.meet}
      />
      <CardWrapper cardHeader="Description">
        <Card.Text>
          {descriptionParsed.map(sentence =>
            <span key={sentence}>{sentence}<br /></span>
          )}
        </Card.Text>
      </CardWrapper>
      <Row>
        <Col className="buttonCol">
          {sameUser
            ? <DropdownButton
              title="Manage item "
              drop="end"
              variant="warning"
              className="manageButton"
            >
              <Dropdown.Item onClick={handleMarkTraded}>Mark as traded</Dropdown.Item>
              <Dropdown.Item>Delete item</Dropdown.Item>
            </DropdownButton>
            : <Button
              type={null}
              className="messageButton"
              onClick={handleMessageOwner}
            >
              Message owner
            </Button>
          }
        </Col>
      </Row>
    </CardWrapper>
  )
}

export default ViewItem
