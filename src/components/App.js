import React ,{useState}from "react"
import Signup from "./Signup"

import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"

import Details  from "./Details"
import  Business_details  from "./Business"
import Profile_details from "./Profile"
import './App.css';
import Personal from "./Personal"

import DisplayLoanStatus from "./DisplayLoanStatus"
import Loan_status from "./Loan_status"
import Pay from "./Pay"
import TopNavbar from "./TopNavbar"
import Personal_info from "./Personal_info"

function App() {

  //
  const [Name, setName] = useState("")

  return (
    <>
    
    
    
    
      
      <div >
        <Router>
         
          <AuthProvider>
          <TopNavbar/>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} nameChanger={setName} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/displayLoan" component={DisplayLoanStatus} />
              <PrivateRoute path="/add-profile" component={Details} names={Name}/>
              <Route path="/signup" component={Signup} />
              <Route path="/profile" component={Profile_details} />
              <Route path="/business" component={Business_details} />
              <Route path="/personal" component={Personal} />
              <Route path="/personal_info" component={Personal_info} />

              <Route path="/loan_status" component={Loan_status} />
              <Route path="/pay" component={Pay} />
              <Route path="/login" component={Login} namechanger={setName}/>
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
   
    </>
  )
}

export default App
