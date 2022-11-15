import React from 'react'
import {Link} from "react-router-dom"

export default function() {
  return (
    <div className="col-lg-4 col-md-4 d-md-block">
    <div className="card bg-common card-left">
        <div className="card-body">
            <ul className="nav d-block ">
                <li className="nav-item">
                    
                    <Link to="/profile"  className="nav-link active">
                    <i className="fas fa-user-alt"></i> Profile
          </Link>
                </li>
                <li className="nav-item">
                <Link to="/personal"  className="nav-link active">
                    <i className="fa fa-credit-card"></i> Personal Loan
          </Link>
                    
                </li>
                <li className="nav-item">
                <Link to="/business"  className="nav-link active">
                <i className="far fa-handshake"></i> Business Loan
          </Link>
                    
                </li>
                <li className="nav-item">
                <Link to="/Loan_status"  className="nav-link active">
                <i className="fas fa-sync"></i> Loan Status
          </Link>
                </li>
                <li className="nav-item">
                <Link to="/pay"  className="nav-link active">
                <i className="far fa-credit-card"></i> Pay Bill
          </Link>
                    </li>
            </ul>
        </div>
    </div>
</div>
  )
}
