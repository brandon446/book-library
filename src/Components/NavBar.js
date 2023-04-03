import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function NavBar({user}) {
  console.log(user)
  const navigate = useNavigate();
  const token =localStorage.getItem('token');
  // Logout
  const logout = () =>{
    sessionStorage.clear();
    localStorage.clear();
          navigate("/login");
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <p className="navbar-brand">Felumamu Library</p>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
          <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/home" className="nav-link " aria-current="page">
                List Of Books
              </Link>
            </li>
            
              
             
             {token? (<> 
             <li className="nav-item">
              <Link to='/login'onClick ={logout} className="nav-link" aria-expanded="false">
               Logout
              </Link>
            </li></>) : (<><li className="nav-item">
              <Link to='/login' className="nav-link" aria-expanded="false">
               Login
              </Link>
            </li><li className="nav-item">
              <Link to="/register" className="nav-link" aria-expanded="false">
                Register
              </Link>
            </li></>) }

            
            {/* <li className="nav-item">
              <Link to="/user" className="nav-link ">
                My Profile
              </Link>
            </li> */}
            
            
            {/* <li className="nav-item">
              <Link to="/admin" className="nav-link" aria-expanded="false">
                Admin Panel
              </Link>
            </li> */}
          </ul>
        </div>
      
      </div>
    </nav>
  );
}

export default NavBar;