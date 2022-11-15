import React, { useState, useEffect } from 'react'
import { dataRef, storageRef } from '../firebase_config'
import TopNavbar from './TopNavbar';


export default function DisplayLoanStatus() {

  const [user, setUser] = useState({
    email: "",
    name: "",
    phone_no: +91,
    account_no: "",
    interest_rate: 12,
    proof_of_residence: "",
    proof_of_identity: "",
    salary: "",
    bank_statement: "",
    loan_amount: ""
  })
  let email;
  useEffect(() => {
    const dataReff = dataRef.ref(localStorage.getItem("username").replace(".", "dot")).on("value", (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setUser({email:data.email,name: data.name, phone_no:data.phone_no,account_no:localStorage.getItem("account"),
    salary:data.salary, loan_amount:data.loan_amount
    })
  
    })
    console.log(email + "emailkj")
    
  }, [])
  
  

  return (
    <>
    <div class="tab-pane" id="loan_status">
      <h1>See your loan status</h1>
      <label for="formGroupExampleInput" class="form-label">Enter Loan ID</label>
      <input type="text" class="form-control" id="formGroupExampleInput" />
      <small class="form-text text-muted">Enter 10 digit loan ID</small>

      <button type="submit" class="btn btn-primary mb-5 mt-3">submit</button>
      <table class="table" id="myTable">
        <h4>Loan Details</h4>
        <tbody>
        <tr>
            <td>Name</td>
            <td>{user.name}</td>
          </tr>
          <tr>
            <td>Loan ID</td>
            <td>1234567890</td>
          </tr>

          <tr>
            <td>Loan type</td>
            <td>Personal</td>
          </tr>

          <tr>
            <td>Loan status</td>
            <td>approved</td>
          </tr>


          <tr>
            <td>Outstanding Amount</td>
            <td>{user.loan_amount}</td>
          </tr>

          <tr>
            <td>Rate Of Interest</td>
            <td>{user.interest_rate}</td>
          </tr>

          <tr>
            <td>EMI</td>
            <td>1234578</td>
          </tr>

          <tr>
            <td>Amount Payable</td>
            <td>1234578</td>
          </tr>

          <tr>
            <td>Duration</td>
            <td>1234578</td>
          </tr>

        </tbody>
      </table>
    </div>
    </>
  )
}
