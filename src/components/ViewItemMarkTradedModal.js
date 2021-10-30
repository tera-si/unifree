import React, { forwardRef } from "react"
import { useSelector } from "react-redux"
import { Button, Form, Modal, Spinner } from "react-bootstrap"
import "../styles/ViewItemMarkTradedModal.css"

const ViewItemMarkTradedModal = forwardRef((props, ref) => {
  const allChatUsers = useSelector(state => state.allChatUsers)

  return (
    <Modal show={props.showModal} onHide={props.handleToggleModal} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Mark as traded</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Item<br />
        <Form.Control type="text" value={props.itemName} readOnly className="itemNameBar" />
        is traded with<br/>
        <Form.Select ref={ref} disabled={props.loading} className="selectTradedWithBar">
          <option hidden value={-1} key="blankChoice">
            Select an user
          </option>
          {allChatUsers.length <= 0
            ? <option value={-1} key="invalidChoice">You have not messaged any users</option>
            : allChatUsers.map(user =>
              <option key={user.userId} value={user.userId}>{user.username}</option>
            )
          }
        </Form.Select>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.handleToggleModal} disabled={props.loading}>
          Cancel
        </Button>
        {props.loading
          ? <Button disabled>
            <Spinner
              as="span"
              animation="border"
              role="status"
              aria-hidden="true"
            />
            <span className="hidden">Loading...</span>
          </Button>
          : <Button onClick={props.handleConfirmButton}>
            Confirm
          </Button>
        }
      </Modal.Footer>
    </Modal>
  )
})

export default ViewItemMarkTradedModal
