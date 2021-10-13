import React, { useState, createRef, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Button, Card, Col, CardGroup, Form, Row, Spinner } from "react-bootstrap"
import CardWrapper from "./CardWrapper"
import PostItemImage from "./PostItemImage"
import PostItemInfo from "./PostItemInfo"
import PostItemRequirement from "./PostItemRequirement"
import itemService from "../services/itemService"
import { actionSetSuccessNotice, actionSetErrorNotice } from "../reducers/notificationReducer"
import "../styles/PostItem.css"
import { actionClearSelectedItem } from "../reducers/selectedItemReducer"
import { actionClearSelectedUser } from "../reducers/selectedUserReducer"

const PostItem = () => {
  const [uploadedImages, setUploadedImages] = useState([])
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actionClearSelectedItem())
    dispatch(actionClearSelectedUser())
  }, [dispatch])

  const refs = {
    name: createRef(),
    category: createRef(),
    condition: createRef(),
    shipping: createRef(),
    meet: createRef(),
    description: createRef()
  }

  const resetAllFields = () => {
    refs.name.current.value = ""
    refs.category.current.value = -1
    refs.condition.current.value = -1
    refs.shipping.current.checked = false
    refs.meet.current.checked = false
    refs.description.current.value = ""
    setUploadedImages([])
  }

  const invalidForm = () => {
    return !uploadedImages || (uploadedImages.length < 1 || uploadedImages.length > 8) ||
           !refs.name.current.value || refs.name.current.value.trim().length <= 0 ||
           refs.category.current.value === "-1" || refs.condition.current.value === "-1" ||
           !(refs.shipping.current.checked || refs.meet.current.checked) ||
           !refs.description.current.value || refs.description.current.value.trim().length <= 0
  }

  // TODO: redirect to individual item page after posting
  const handlePost = async (event) => {
    event.preventDefault()

    if (loading) {
      return
    }

    if (invalidForm()) {
      dispatch(actionSetErrorNotice("Error: please fill in all item info"))
      return
    }

    const formData = new FormData()

    // Must iterate over the uploaded list of images
    // Cannot directly use formData.append(uploadedImages) here, cuz that would
    // result in [object File] instead of an array of the actual files
    for (let i = 0; i < uploadedImages.length; i++) {
      formData.append("item-images", uploadedImages[i])
    }

    formData.append("item-name", refs.name.current.value.trim())
    formData.append("item-category", refs.category.current.value)
    formData.append("item-condition", refs.condition.current.value)
    formData.append("item-shipping", refs.shipping.current.checked)
    formData.append("item-meet", refs.meet.current.checked)
    formData.append("item-description", refs.description.current.value.trim())

    const itemName = refs.name.current.value.trim()

    resetAllFields()
    setLoading(true)

    try {
      await itemService.postNew(formData)
      dispatch(actionSetSuccessNotice(`New item "${itemName}" successfully posted`))
    }
    catch (e) {
      if (!e.response) {
        dispatch(actionSetErrorNotice(`Error: ${e.message}`))
      }
      else {
        dispatch(actionSetErrorNotice(`Error: ${e.response.data.error}`))
      }
    }

    setLoading(false)
  }

  //? Use react-bootstrap modal instead of window.confirm ?//
  const handleReset = (event) => {
    event.preventDefault()

    if (window.confirm("Reset all info and images?")) {
      resetAllFields()
    }
  }

  return (
    <CardWrapper>
      <Card.Title>Post Item</Card.Title>
      <PostItemRequirement />
      <Form onSubmit={handlePost}>
        <CardGroup>
          <PostItemImage
            uploadedImages={uploadedImages}
            setUploadedImages={setUploadedImages}
            loading={loading}
          />
          <PostItemInfo ref={refs} loading={loading} />
        </CardGroup>
        <CardWrapper cardHeader="Item description">
          <Form.Control as="textarea" ref={refs.description} className="descriptionArea" disabled={loading} />
        </CardWrapper>
        <Row className="inputRow">
          {loading
            ? <Col>
              <Button disabled className="spinnerButton">
                <Spinner
                  as="span"
                  animation="border"
                  role="status"
                  aria-hidden="true"
                />
                <span className="hidden">Loading...</span>
              </Button>
            </Col>
            : <Col>
                <Button type="submit" className="postButton">
                  Post item
                </Button>
            </Col>
          }
          <Col>
            <Button type="null" variant="danger" onClick={handleReset} disabled={loading} className="resetButton">
              Reset all
            </Button>
          </Col>
        </Row>
      </Form>
    </CardWrapper>
  )
}

export default PostItem
