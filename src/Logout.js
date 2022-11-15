import React from 'react'
import { useAuth } from "./contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"


export default function Logout() {

    const { currentUser, logout } = useAuth()

    const history = useHistory();

    async function handleLogout() {
        
        localStorage.clear();
    
        try {
          await logout()
          history.push("/login")
        } catch {
          
        }
      }


  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  )
}
