import React, { useState , useRef } from 'react'
import { dataRef, storageRef } from '../firebase_config'
import { useHistory } from "react-router-dom"
import Navbar from './Navbar'
import { v4 as uuid } from 'uuid';

import { render } from "react-dom";
import { useReactToPrint } from "react-to-print";

export default function Personal() {
    const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
    const history = useHistory();
    const unique_id = uuid();
    const small_id = unique_id.slice(0,8)

    // const dataReff = dataRef.ref(localStorage.getItem("username").replace(".","dot")).on("value", (snapshot) => {
    //     const data = snapshot.val();
    //     console.log(data);
    //     if(data.loan_amount){
    //         alert("You already have an active loan.")
    //         history.push("/")
    //     }
        
    // })
    
    const [user, setUser] = useState({
        email : "",
        name : "",
        address: "",
        phone_no : +91,
        account_no : "",
        interest_rate: 12,
        proof_of_residence: "",
        proof_of_identity: "",
        salary: "",
        salary_statement: "",
        loan_amount: "",
        repayment: "",
        apna_photo: "",
        signature: "",
        loan_id: ""
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
            upload(user.salary_statement),upload(user.apna_photo),upload(user.signature)
        ]);
        console.log(fileUploads);
        
        dataRef.ref(localStorage.getItem("username").replace(".", "dot")+"_personal_Loan").update({
            email : localStorage.getItem("username"),
        name : user.name,
        address: user.address,
        phone_no : user.phone_no,
        account_no : localStorage.getItem("account"),
        loan_amount : user.loan_amount,
        interest_rate: "",
        repayment : user.repayment,
        proof_of_residence: fileUploads[0],
        proof_of_identity: fileUploads[1],
        salary: user.salary,
        salary_statement: fileUploads[2],
        profile_photo : fileUploads[3],
        signature : fileUploads[4],
        loan_id : small_id
        }).catch(alert)

        console.log(small_id)
        
    }

    const handleDisplay = async() => {
        const dataReff = dataRef.ref(localStorage.getItem("username").replace(".","dot")+"email").on("value", (snapshot) => {
            const data = snapshot.val();
            console.log(data);
            
        })
    }
  return (
    <div className="bg-right">
    <div className="container-fluid mt-5">
        <div className="row">
            <div className="col-md-10 col-11 mx-auto">
    
                <div className="row">
                   {/* */}
                   <Navbar/>
                    <div className="col-lg-7 col-md-8 ">
                    <div className="card">
                       
                                <div className="card-body tab-content border-0">
                                <div className="tab-pane active" id="profile">
                                    <h1>Personal Loan
                                    </h1>
                                    <form>
                                            <div className="mb-3">
                                            
                                            <label htmlFor="p_name" className="form-label">Name</label>
                                                    <input type="text" onChange={(e) => { setUser({...user, name : e.target.value}) }} className="form-control" id="fp_name" placeholder="Enter your name"/>
                                                    <label htmlFor="p_phone" className="form-label">Phone Number</label>
                                                    <input type="text" onChange={(e) => { setUser({...user, phone_no : e.target.value}) }} className="form-control" id="p_phone" placeholder="Enter 10 digit phone number"/>
                                                    <label htmlFor="p_email" className="form-label">Email</label>
                                                    <input type="email" onChange={(e) => { setUser({...user, email : e.target.value}) }}  className="form-control" id="p_email" placeholder="Enter email"/>
                                                    <label htmlFor="p_address" className="form-label">Address</label>
                                                    <textarea className="form-control" onChange={(e) => { setUser({...user, address : e.target.value}) }} id="p_address" rows="3" placeholder="Enter full address"></textarea>
                                                    <label htmlFor="p_sal" className="form-label">Annual Salary</label>
                                                    <input type="number" onChange={(e) => { setUser({...user, salary : e.target.value}) }} className="form-control" id="p_sal" placeholder="Enter annual salary in digits"/>
                                                    <label htmlFor="p_amt" className="form-label">Loan Amount</label>
                                                    <input type="text" onChange={(e) => { setUser({...user, loan_amount : e.target.value}) }}  className="form-control" id="p_amt" placeholder="Enter loan amount"/>
                                                    <label htmlFor="p_repayment" className="form-label">Repayment</label>
                                                    <input type="text" onChange={(e) => { setUser({...user, repayment : e.target.value}) }} className="form-control" id="p_repayment" placeholder="Enter in months"/>
                                                    <label htmlFor="p_residence" className="form-label">Proof of Residence</label>
                                                    <input className="form-control" type="file" onChange={(e) => { setUser({...user, proof_of_residence : e.target.value}) }} id="p_residence"></input>
                                                    <label htmlFor="p_identity" className="form-label">Proof of Identity</label>
                                                    <input className="form-control" type="file" onChange={(e) => { setUser({...user, proof_of_identity : e.target.value}) }} id="p_identity"></input>
                                                    <label htmlFor="p_sal" className="form-label">Salary Statement</label>
                                                    <input className="form-control" type="file" onChange={(e) => { setUser({...user, salary_statement : e.target.value}) }} id="p_sal"></input>
                                                    <label htmlFor="p_photo" className="form-label">Photo</label>
                                                    <input className="form-control" type="file" onChange={(e) => { setUser({...user, apna_photo : e.target.value}) }} id="p_photo"></input>
                                                    <label htmlFor="p_sign" className="form-label">Signature</label>
                                                    <input className="form-control mb-3" type="file" onChange={(e) => { setUser({...user, signature : e.target.value}) }} id="p_sign"></input>
    
                                                    <button type="submit" className="btn btn-primary mb-3" onClick={handleAddData}>submit</button>
                                                    
                                                    
                                                    
<button type="button" class="btn btn-primary mb-3" data-toggle="modal" data-target="#exampleModalCenter">
  Download
</button>


<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      
      
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <div ref={componentRef} >
          Form to print;
        </div>
        <button type="button" onClick={handlePrint} class="btn btn-primary">Print</button>
      </div>
    </div>
  </div>
</div>
                                                  
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
  )
}
