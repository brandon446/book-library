import React, {  useContext, useState } from "react";


import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userType, setUserType] = useState("user");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  
  const handleLogin = (event) => {
    event.preventDefault();
  
    fetch("/login",{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password, userType
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response.error) {
        // Show an error message
        console.log(response.message);
      } else {
        localStorage.setItem("token", response.jwt);
        console.log(response)
        // Navigate to the appropriate component
        if (userType === "admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      }
    });
  };

  return (
    <div className="auth-wrapper container">
      <div className="auth-inner">
        <form onSubmit={handleLogin}>
          <h3>Sign In</h3>

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
            <label style={{ marginRight: "10px" }}>
              Login As:
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                style={{ marginLeft: "5px" }}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </label>
          </div>
          <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />

              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right">
          <Link to="/register">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}