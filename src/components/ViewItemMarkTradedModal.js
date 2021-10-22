import React from "react"
import { useSelector } from "react-redux"
import { Button, Form, Modal } from "react-bootstrap"

// TODO: communicate with backend
const ViewItemMarkTradedModal = ({ showModal, handleToggleModal, itemName }) => {
  const allChatUsers = useSelector(state => state.allChatUsers)

  return (
    <Modal show={showModal} onHide={handleToggleModal} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Mark as traded</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Item<br />
        <Form.Control type="text" value={itemName} readOnly />
        is traded with<br/>
        <Form.Select>
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
        <Button variant="danger" onClick={handleToggleModal}>
          Cancel
        </Button>
        <Button>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ViewItemMarkTradedModal
