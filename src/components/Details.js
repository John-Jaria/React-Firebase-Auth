import React, { useState } from 'react'
import { dataRef, storageRef } from '../firebase_config'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { useRef } from 'react'


export default function Details(props) {
    let data = useRef();
    data = props.names;
    const history = useHistory();

    const dataReff = dataRef.ref(localStorage.getItem("username").replace(".","dot")).on("value", (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if(data.loan_amount){
            alert("You already have an active loan.")
            history.push("/")
        }
        
    })
    
    const [user, setUser] = useState({
        email : props.names,
        name : "",
        phone_no : +91,
        account_no : "",
        interest_rate: 12,
        proof_of_residence: "",
        proof_of_identity: "",
        salary: "",
        bank_statement: "",
        loan_amount: ""
    })

    const upload = async (image) => {
        
        if (image === null) {
            return;
        }
        const imageSnapshot = await storageRef.ref('/image/' + image.name).put(image);
        return imageSnapshot.ref.getDownloadURL();
    }

    const handleAddData = async(e) => {
        e.preventDefault();
        const fileUploads = await Promise.all([upload(user.proof_of_identity), 
            upload(user.proof_of_residence), 
            upload(user.bank_statement)
        ]);
        console.log(fileUploads);
        
        dataRef.ref(localStorage.getItem("username").replace(".", "dot")).update({
            email : localStorage.getItem("username"),
        name : user.name,
        phone_no : user.phone_no,
        account_no : localStorage.getItem("account"),
        loan_amount : user.loan_amount,
        interest_rate: "",
        proof_of_residence: fileUploads[0],
        proof_of_identity: fileUploads[1],
        salary: user.salary,
        bank_statement: fileUploads[2]
        }).catch(alert)
        
    }

    const handleDisplay = async() => {
        const dataReff = dataRef.ref(props.names.replace(".","dot")+"email").on("value", (snapshot) => {
            const data = snapshot.val();
            console.log(data);
            
        })
    }
    return (
       
            <>
            <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Enter Details For Personal Loan</h2>
          
          <Form onSubmit={(e) => handleAddData(e)}>
            <Form.Group id="email">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text"  onChange={(e) => { setUser({...user, name : e.target.value}) }} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" value={localStorage.getItem("username")} onChange={(e) => { setUser({...user, email:e.target.value}) }} />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Phone no</Form.Label>
              <Form.Control type="tel" onChange={(e) => { setUser({...user,phone_no:e.target.value}) }} />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Loan Amount</Form.Label>
              <Form.Control type="text" onChange={(e) => { setUser({...user,loan_amount:e.target.value}) }} />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Account no</Form.Label>
              <Form.Control type="text" value={localStorage.getItem("account")} onChange={(e) => { setUser({...user,account_no:e.target.value}) }} />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Proof of Residence</Form.Label>
              <Form.Control type="file" onChange={(e) => { setUser({...user,proof_of_residence:e.target.value}) }} />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Proof of Identity</Form.Label>
              <Form.Control type="file" onChange={(e) => { setUser({...user,proof_of_identity:e.target.value}) }} />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Salary</Form.Label>
              <Form.Control type="text" onChange={(e) => { setUser({...user,salary:e.target.value}) }} />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Bank Statement</Form.Label>
              <Form.Control type="file" onChange={(e) => { setUser({...user,bank_statement:e.target.value}) }} />
            </Form.Group>
            <Button  className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
        <div className="w-100 text-center">
        <Link to="/">Cancel</Link>
        </div>
      </Card>
      
      
            </>

       
    )
}
