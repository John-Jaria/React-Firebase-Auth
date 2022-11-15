import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { dataRef, storageRef } from '../firebase_config'

import { Link, useHistory } from "react-router-dom"

export default function Login(props) {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      localStorage.setItem("username", emailRef.current.value)
      const dataReff = dataRef.ref(emailRef.current.value.replace(".","dot")+"_details").on("value", (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        localStorage.setItem("account", data.account)
        
      localStorage.setItem("name", data.name);
      localStorage.setItem("total_balance", data.total_balance);

      localStorage.setItem("phone_no", data.phone_no);

      
    })
    
      history.push({pathname:"/", state:{name: "vivek", pass:"john"}})


    } catch {
      setError("Failed to log in")
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
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
      </div>
      </Container>
    </>
  )
}
