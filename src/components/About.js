import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Card } from "react-bootstrap"
import CardWrapper from "./CardWrapper"
import { actionClearSelectedItem } from "../reducers/selectedItemReducer"
import { actionClearSelectedUser } from "../reducers/selectedUserReducer"

const About = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actionClearSelectedItem())
    dispatch(actionClearSelectedUser())
  }, [dispatch])

  return (
    <CardWrapper>
      <Card.Title>About uniFree</Card.Title>
      <Card.Text>uniFree is a...</Card.Text>
    </CardWrapper>
  )
}

export default About
