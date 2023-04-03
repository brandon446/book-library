import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import "../Register.css";

export default function Register() {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ password_confirmation, setConfirmPassword ] = useState("")
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    let url;
    if (userType === "Admin") {
      if (secretKey !== "mamboImechemka") {
        alert("Invalid Admin");
        return;
      }
      url = "/admins";
    } else {
      url = "/users";
    }
  
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        password_confirmation,
        userType,
      }),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/login");
        } else {
          // Handle error response
        }
      })
      .catch((error) => console.log(error));
  };
  

  return (
    <div className="auth-wrapper container form-floating mb-3">
      <div className="auth-inner ">
        <form onSubmit={handleSubmit} className="registration-form">
          <h3>Sign Up</h3>
          <div className="m-4">
            Register As
            <input
              type="radio"
              name="UserType"
              value="User"
              onChange={(e) => setUserType(e.target.value)}
              className="px-4 "
            />
            User
            <input
              type="radio"
              name="UserType"
              value="Admin"
              onChange={(e) => setUserType(e.target.value)}
              className="px-4 "
            />
            Admin
          </div>
          {userType === "Admin" ? (
            <div className="mb-3">
              <label>Secret Key</label>
              <input
                type="text"
                className="form-control"
                placeholder="Secret Key"
                onChange={(e) => setSecretKey(e.target.value)}
              />
            </div>
          ) : null}

         
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <Link to="/login">sign in?</Link>
          </p>
        </form>
      </div>
    </div>
  );
}