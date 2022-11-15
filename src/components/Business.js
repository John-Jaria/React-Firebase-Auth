import React, { useState, useRef } from 'react'
import Navbar from './Navbar'
import { dataRef, storageRef } from '../firebase_config'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import TopNavbar from './TopNavbar'
import { useReactToPrint } from "react-to-print";

import { v4 as uuid } from 'uuid';


export default function Business_details() {
    const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

    const unique_id = uuid();
    const small_id = unique_id.slice(0,8)

    const history = useHistory();

    // const dataReff = dataRef.ref(localStorage.getItem("username").replace(".","dot")).on("value", (snapshot) => {
    //     const data = snapshot.val();
    //     console.log(data);
    //     if(data.loan_amount){
    //         alert("You already have an active loan.")
    //         history.push("/")
    //     }

    // })

    const [user, setUser] = useState({
        email: "",
        name: "",
        bussiness_name: "",
        collateral_info: "",
        collateral_owner_name: "",
        Relationship_with_owner: "",
        address: "",
        identity_proof_of_owner_of_collateral : "",
        phone_no: +91,
        account_no: "",
        interest_rate: 12,
        proof_of_residence: "",
        proof_of_identity: "",
        salary: "",
        salary_statement: "",
        loan_amount: "",
        repayment: "",
        photo_applicant: "",
        signature_applicant: "",
        signature_collateral_owner : "",
        loan_id: ""
    })

    const upload = async (image) => {

        if (image === null) {
            return;
        }
        const imageSnapshot = await storageRef.ref('/image/' + image.name).put(image);
        return imageSnapshot.ref.getDownloadURL();
    }

    const handleAddData = async (e) => {
        e.preventDefault();
        const fileUploads = await Promise.all([upload(user.proof_of_identity),
        upload(user.proof_of_residence),
        upload(user.salary_statement), upload(user.photo_applicant), upload(user.signature_applicant),
        upload(user.signature_collateral_owner),upload(user.identity_proof_of_owner_of_collateral)
        ]);
        console.log(fileUploads);

        dataRef.ref(localStorage.getItem("username").replace(".", "dot") + "_bussiness_Loan").update({
            email: localStorage.getItem("username"),
            name: user.name,
            bussiness_name: user.bussiness_name,
            address: user.address,
            phone_no: user.phone_no,
            account_no: localStorage.getItem("account"),
            loan_amount: user.loan_amount,
            interest_rate: "",
            collateral_info : user.collateral_info,
            collateral_owner_name: user.collateral_owner_name,
            Relationship_with_owner : user.Relationship_with_owner,
            repayment: user.repayment,
            identity_proof_of_owner_of_collateral : fileUploads[6],
            proof_of_residence: fileUploads[0],
            proof_of_identity: fileUploads[1],
            salary: user.salary,
            salary_statement: fileUploads[2],
            profile_photo: fileUploads[3],
            signature: fileUploads[4],
            signature_collateral_owner: fileUploads[5],
            loan_id: small_id
        }).catch(alert)

    }

    const handleDisplay = async () => {
        const dataReff = dataRef.ref(localStorage.getItem("username").replace(".", "dot") + "email").on("value", (snapshot) => {
            const data = snapshot.val();
            console.log(data);

        })
    }


    return (

        <>
        <div class="bg-right">
            <div class="container-fluid mt-5">
                <div class="row">
                    <div class="col-md-10 col-11 mx-auto">

                        <div class="row">
                            {/* */}
                            <Navbar />
                            <div class="col-lg-7 col-md-8 ">
                                <div class="card">

                                    <div class="card-body tab-content border-0">
                                        <div class="tab-pane active" id="profile">
                                            <h1>Business Loan
                                            </h1>
                                            <form>
                                                <div class="mb-3">
                                                    <label for="b_name" class="form-label">Name</label>
                                                    <input type="text" class="form-control" onChange={(e) => { setUser({...user, name : e.target.value}) }} id="fb_name" placeholder="Enter your name" />
                                                    <label for="b_bname" class="form-label">Bussiness Name</label>
                                                    <input type="text" class="form-control" onChange={(e) => { setUser({...user, bussiness_name : e.target.value}) }} id="b_bname" placeholder="Enter name of your comapany" />
                                                    <label for="b_phone" class="form-label">Phone Number</label>
                                                    <input type="text" class="form-control" onChange={(e) => { setUser({...user, phone_no : e.target.value}) }} id="b_phone" placeholder="Enter 10 digit phone number" />
                                                    <label for="b_email" class="form-label">Email</label>
                                                    <input type="email" class="form-control" onChange={(e) => { setUser({...user, email : e.target.value}) }} id="b_email" placeholder="Enter email" />
                                                    <label for="b_address" class="form-label">Address</label>
                                                    <textarea class="form-control" id="b_address" onChange={(e) => { setUser({...user, address : e.target.value}) }} rows="3" placeholder="Enter full address"></textarea>
                                                    <label for="b_amt" class="form-label">Loan Amount</label>
                                                    <input type="text" class="form-control" onChange={(e) => { setUser({...user, loan_amount : e.target.value}) }} id="b_amt" placeholder="Enter loan amount" />
                                                    <label for="b_repayment" class="form-label">Repayment</label>
                                                    <input type="text" class="form-control" onChange={(e) => { setUser({...user, repayment : e.target.value}) }} id="b_repayment" placeholder="Enter in months" />
                                                    <label for="b_collateral" class="form-label">Collateral Information</label>
                                                    <textarea class="form-control" id="b_address" onChange={(e) => { setUser({...user, collateral_info : e.target.value}) }} rows="3" placeholder="Collateral Description or Property Address"></textarea>
                                                    <label for="b_repayment" class="form-label">Collateral owner name</label>
                                                    <input type="text" class="form-control" id="b_repayment" onChange={(e) => { setUser({...user, collateral_owner_name : e.target.value}) }} placeholder="Name of collateral owner" />
                                                    <label for="b_relationship" class="form-label">Relationship with the owner</label>
                                                    <input type="text" class="form-control" id="b_relationship" onChange={(e) => { setUser({...user, Relationship_with_owner : e.target.value}) }} placeholder="Enter your relationship" />
                                                    <label for="b_identity" class="form-label">Proof of Residence</label>
                                                    <input class="form-control" type="file" onChange={(e) => { setUser({...user, proof_of_residence : e.target.value}) }} id="b_residence"></input>
                                                    <label for="b_identity" class="form-label">Identity proof of Applicant</label>
                                                    <input class="form-control" type="file" onChange={(e) => { setUser({...user, proof_of_identity : e.target.value}) }} id="b_identity"></input>
                                                    <label for="b_cidentity" class="form-label">Identity proof of owner of collateral</label>
                                                    <input class="form-control" type="file" onChange={(e) => { setUser({...user, identity_proof_of_owner_of_collateral : e.target.value}) }} id="b_cidentity"></input>

                                                    <label for="b_aphoto" class="form-label">Photo of Applicant</label>
                                                    <input class="form-control" onChange={(e) => { setUser({...user,photo_applicant : e.target.value}) }} type="file" id="b_aphoto"></input>
                                                    <label for="b_asign" class="form-label">Signature of Applicant</label>
                                                    <input class="form-control" onChange={(e) => { setUser({...user, signature_applicant : e.target.value}) }} type="file" id="b_asign"></input>
                                                    <label for="b_ccsign" class="form-label">Signature of collateral owner</label>
                                                    <input class="form-control mb-3" onChange={(e) => { setUser({...user, signature_collateral_owner : e.target.value}) }}type="file" id="b_csign"></input>

                                                    <button type="submit" onClick={handleAddData} class="btn btn-primary">submit</button>

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
        </>
    )
}
