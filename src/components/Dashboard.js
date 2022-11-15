import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

import Navbar from "./Navbar"
import DisplayLoanStatus from "./DisplayLoanStatus"
import  Business  from "./Business"
import Profile from "./Profile"
import Loan_status from "./Loan_status"
import TopNavbar from "./TopNavbar"

export default function Dashboard(props) {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory();
  

  React.useEffect(() => {
    
    props.nameChanger(currentUser.email);
  }, [currentUser]);
  
  
  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
    
    
    
   
    <Profile/>
     <Card>
      
        <Card.Body>
          <h2 className="text-center mb-4">Profile{}</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/add-profile"  className="btn btn-primary w-100 mt-3">
             Add details
          </Link>
          <Link to="/update-profile"  className="btn btn-primary w-100 mt-3">
            Update Credentials
          </Link>
          <Link to="/displayLoan"  className="btn btn-primary w-100 mt-3">
            Display Loan Status
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
      
    </>
  )
}
