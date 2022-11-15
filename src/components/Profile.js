import React,{useState, useEffect} from 'react'
import { useHistory } from "react-router-dom"

import Navbar from './Navbar'
import { dataRef } from '../firebase_config'





export default function Profile_details() {

  const history = useHistory();


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
        total_amount : "",
        loan_amount: ""
      })
      let email;
      useEffect(() => {
        try {
          const dataReff = dataRef.ref(localStorage.getItem("username").replace(".", "dot")+"_details").on("value", (snapshot) => {
            const data = snapshot.val();
            console.log(data);
            setUser({email:data.email,name: data.name, phone_no:data.phone_no,account_no:localStorage.getItem("account"),
          salary:data.salary, loan_amount:data.loan_amount, total_amount : data.total_balance
          })
        
          })
          console.log(email + "emailkj")
        } catch (error) {
          history.push("/login")

        }
        
        
      }, [])



  return (

    <>
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
                                    <h1>Your Profile</h1>
                                    <form>
                                            <div class="mb-3">
                                                <label for="name" class="form-label">Name</label>
                                                <input value={user.name}type="text" readonly="readonly" class="form-control" id="name" placeholder={user.name}/>
                                                <label for="email" class="form-label">Email</label>
                                                <input type="text" readonly="readonly" class="form-control" id="email" placeholder={user.email}/>
                                                <label for="phone" class="form-label">Phone Number</label>
                                                <input type="text" readonly="readonly" class="form-control" id="phone" placeholder={user.phone_no}/>
                                                <label for="acc_no" class="form-label">Account Number</label>
                                                <input type="text" readonly="readonly" class="form-control" id="acc_no" placeholder={user.account_no}/>
                                                <label for="bal" class="form-label">Total Balance</label>
                                                <input type="number" readonly="readonly" class="form-control" id="bal" placeholder={user.total_amount}/>
                                                 
                                            </div>
                                    </form>

                                </div>
                                
                            
                             
                                
                    </div>
                    </div>
                    
                </div>

                </div>
                
            </div>
        </div>

    </div>
    
</div>

</>
  )
}
