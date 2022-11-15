import React from 'react'
import { Link} from "react-router-dom"
import Logout from '../Logout';
// import { useAuth } from "../contexts/AuthContext"



export default function TopNavbar() {
  const username = localStorage.getItem("username");
//   const logout = useAuth()

//   const history = useHistory();


//  async function handleLogout() {
    

//     try {
//       await logout()

//       history.push("/login")
//     } catch {
//       console.log(logout)
//     }
//   }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Ecom Bank</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        
        <Link to="/profile"  className="nav-link active">
                    Home
          </Link>
      </li>
      <li className="nav-item">
        <a className="nav-link"  href="#">Button</a>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Loans
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          
          <Link to="/personal_info"  className="dropdown-item">
                    Personal Loan
          </Link>
          <Link to="/personal_info"  className="dropdown-item">
                    Bussiness Loan
          </Link>
          
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li className="nav-item">
        <a className="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>
    <form className="form-inline my-2 my-lg-0">
      
    { username ? <Logout/> : null }



    </form>
  </div>
</nav>
  )
}
