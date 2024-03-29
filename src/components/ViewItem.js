import React, { useState, useEffect, createRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Button, Card, Dropdown, DropdownButton, Row, Col, Spinner } from "react-bootstrap"
import { useParams, Redirect } from "react-router-dom"
import socket from "../socket"
import itemService from "../services/itemService"
import tradeHistoryService from "../services/tradeHistoryService"
import CardWrapper from "./CardWrapper"
import ViewItemHeader from "./ViewItemHeader"
import ItemCarousel from "./ItemCarousel"
import ViewItemBasicInfo from "./ViewItemBasicInfo"
import CenteredSpinnerCol from "./CenteredSpinnerCol"
import ViewItemMarkTradedModal from "./ViewItemMarkTradedModal"
import { actionSetSelectedUser } from "../reducers/selectedUserReducer"
import { actionSetSelectedItem } from "../reducers/selectedItemReducer"
import { actionConcatNewMessage } from "../reducers/allChatMessageReducer"
import { actionConcatNewUser } from "../reducers/allChatUsersReducer"
import { actionSetErrorNotice, actionSetSuccessNotice } from "../reducers/notificationReducer"
import "../styles/ViewItem.css"

const ViewItem = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const auth = useSelector(state => state.auth)

  const [redirectToMessage, setRedirectToMessage] = useState(false)
  const [redirectToHome, setRedirectToHome] = useState(false)
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalLoading, setModalLoading] = useState(false)

  useEffect(() => {
    const getItem = async () => {
      let response = null

      try {
        response = await itemService.getItem(id)
      }
      catch (e) {
        dispatch(actionSetErrorNotice("Error: unable to retrieve item data"))
        return
      }

      setItem(response)
    }

    getItem()
  }, [id, dispatch])

  if (redirectToMessage) {
    return <Redirect push to="/message" />
  }

  if (redirectToHome) {
    return <Redirect push to="/" />
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
  const cardWrapperClass = dropdownOpen ? "viewItemDropdownOpened" : "viewItemDropdownClosed"
  const selectTradedWith = createRef()

  const handleDropdownOpen = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const handleToggleModal = () => setShowModal(!showModal)

  const handleMarkTraded = async () => {
    setDropdownOpen(!dropdownOpen)
    handleToggleModal()
  }

  const handleModalConfirmButton = async () => {
    if (modalLoading) {
      return
    }

    if (selectTradedWith.current.value === "-1") {
      dispatch(actionSetErrorNotice("Error: invalid user selected"))
      return
    }

    const updatedItem = {
      ...item,
      availability: false,
    }

    const newHistoryEntry = {
      item: item.id,
      tradedWith: selectTradedWith.current.value
    }

    setModalLoading(true)

    try {
      await tradeHistoryService.postNew(newHistoryEntry)
      await itemService.putUpdate(id, updatedItem)
      dispatch(actionSetSuccessNotice(`${item.name} successfully traded`))
    }
    catch (e) {
      dispatch(actionSetErrorNotice("Error: unable to update item status"))
      return
    }

    setModalLoading(false)
    handleToggleModal()
    setRedirectToHome(true)
  }

  const handleMessageOwner = () => {
    setDropdownOpen(!dropdownOpen)
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

    setRedirectToMessage(true)
  }

  const handleDeleteItem = async () => {
    if (window.confirm(`Delete item ${item.name}?`)) {
      setLoading(true)

      try {
        await itemService.deleteWithID(id)
      }
      catch (e) {
        dispatch(actionSetErrorNotice(`Error: unable to delete item ${item.name}`))
        setLoading(false)
        return
      }

      dispatch(actionSetSuccessNotice(`Item ${item.name} successfully deleted`))
      setLoading(false)
      setRedirectToHome(true)
    }
  }

  return (
    <>
      <CardWrapper class={cardWrapperClass}>
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
            {loading
              ? <Dropdown>
                <Dropdown.Toggle variant="warning" disabled>
                  <Spinner
                    as="span"
                    animation="border"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="hidden">Loading...</span>
                  &nbsp;
                </Dropdown.Toggle>
              </Dropdown>
              : sameUser
                ? <DropdownButton
                  title="Manage item "
                  drop="down"
                  variant="warning"
                  className="manageButton"
                  autoClose="inside"
                  onClick={handleDropdownOpen}
                >
                  <Dropdown.Item onClick={handleMarkTraded}>Mark as traded</Dropdown.Item>
                  <Dropdown.Item onClick={handleDeleteItem}>Delete item</Dropdown.Item>
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

      {sameUser
        ? <ViewItemMarkTradedModal
          showModal={showModal}
          handleToggleModal={handleToggleModal}
          itemName={item.name}
          handleConfirmButton={handleModalConfirmButton}
          ref={selectTradedWith}
          loading={modalLoading}
        />
        : null
      }
    </>
  )
}

export default ViewItem
