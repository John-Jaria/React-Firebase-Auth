import React from 'react'
import { useState , useEffect} from 'react'
import Navbar from './Navbar'
import firebase from 'firebase'
// import {getDatabase} from "firebase/database";

import { dataRef, storageRef} from '../firebase_config'



export default function Loan_status() {
    const[user, setUser] = useState({})
    useEffect(() => {
        const database = firebase.database().ref();
        //console.log(database)
        
        database.on("value", snap => {
            console.log(snap.val());
            setUser(snap.val());
            
        })
        console.log(user);
    }, [])
    
    const [loanid, setLoanid] = useState();
    // const db = getDatabase();
// const starCountRef = ref(db, 'posts/' + postId + '/starCount');
// onValue(starCountRef, (snapshot) => {
//   const data = snapshot.val();
//   updateStarCount(postElement, data);
// });
    
    const [confirm, setConfirm] = useState(false)
    const handleClick = () =>{

        
        setConfirm(true)
    }
  return (
    <div class="bg-right">
    <div class="container-fluid mt-5">
        <div class="row">
            <div class="col-md-10 col-11 mx-auto">
    
                <div class="row">
                   {/* */}
                   <Navbar/>
                    <div class="col-lg-7 col-md-8 ">
                    <div class="card">
                       
                                <div class="card-body tab-content border-0">
                                 <div class="tab-pane active" id="profile">
                                    <h1>Loan Status</h1>
                                    <label for="formGroupExampleInput" class="form-label">Enter Loan ID</label>
                                    <input type="text" class="form-control" onChange={(e) => {setLoanid(e.target.value)} }/>
                                    <small class="form-text text-muted">Enter 10 digit loan ID</small>

                                    <button type="submit" onClick={handleClick} class="btn btn-primary mb-5 mt-3">submit</button>
                                    {confirm ?  <table class="table" id="myTable">
                                            <h4>Loan Details</h4>
                                                <tbody>
                                                    {Object.values(user).map(value=>{
                                                        if(value.loan_id !== loanid)
                                                            return null;
                                                        return (
                                                            
                                                            <>
                                                            <tr>
                                                            <td>Loan ID</td>
                                                            <td>{value.email}</td>
                                                        </tr>
    
                                                        <tr>
                                                            <td>Loan type</td>
                                                            <td>{value.loan_id}</td>
                                                        </tr>
    
                                                        <tr>
                                                            <td>Loan status</td>
                                                            <td>approved</td>
                                                        </tr>
    
    
                                                        <tr>
                                                            <td>Outstanding Amount</td>
                                                            <td>1234567890</td>
                                                        </tr>
    
                                                        <tr>
                                                            <td>Rate Of Interest</td>
                                                            <td>1234567890</td>
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
                                                        </>
                                                        );
                                                    })}
                                                </tbody>
                                        </table>: null}

                                </div> 
                                
                            
                             
                                
                    </div>
                    </div>
                    
                </div>

                </div>
                
            </div>
        </div>

    </div>
    
</div>
  )
}
