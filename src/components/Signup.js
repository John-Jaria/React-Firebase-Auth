import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { dataRef, storageRef } from '../firebase_config'
import { v4 as uuid } from 'uuid';


import { Link, useHistory } from "react-router-dom"

export default function Signup() {
  const emailRef = useRef()
  const nameRef = useRef()
  const phone_noRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const unique_id = uuid();
  const small_id = unique_id.slice(0,8)

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      localStorage.setItem("account", unique_id);
      localStorage.setItem("name", nameRef.current.value);
      localStorage.setItem("total_balance", 50000);

      localStorage.setItem("phone_no", phone_noRef.current.value);

      localStorage.setItem("username", emailRef.current.value);
      dataRef.ref(emailRef.current.value.replace(".", "dot")+"_details").update({
        email : emailRef.current.value,
        name : nameRef.current.value,
        phone_no : phone_noRef.current.value,
        total_balance : 50000,
        account: unique_id
    
    }).catch(alert)
      history.push({pathname:"/", state:{name: "vivek", pass:"john"}})
    } catch {
      setError("Failed to create an account")
    }
    

    setLoading(false)
    
    

  }

  return (
    <>
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      
      <div className="w-100" style={{ maxWidth: "400px" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
          <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={nameRef} required />
            </Form.Group>
            <Form.Group id="Phone no">
              <Form.Label>Phone No</Form.Label>
              <Form.Control type="tel" ref={phone_noRef} required />
            </Form.Group>
            
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
      </div>
      </Container>
    </>
  )
}
