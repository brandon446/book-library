import {Routes, Route} from 'react-router';
import './App.css';
import NavBar from "./Components/NavBar"
import BookCollection from "./Components/BookCollection"
import Login from "./Components/Login"
import Register from "./Components/Register"
import User from "./Components/User"
import Admin from './Components/Admin';
import BookDetails from "./Components/BookDetails"
import HomePage from './Components/HomePage';
import React,{useEffect, useState} from 'react';


function App() {
  const token =localStorage.getItem('token');
 const [user,setUser] = useState()

  useEffect(() => {
    // fetch the current user's data from the API
    fetch('/loggedin' ,{
      method : 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    },
    })

      .then(response => response.json())
      .then(data => {setUser(data) 
        // console.log('data', data )
       })

      .catch(error => console.error(error));
  }, [token]);
  console.log(user)

  return (
    <div className="App">
      <NavBar user = {user}/>
      <Routes>

    
      <Route path='/' element={<HomePage/>}/>
      <Route exact path="/home" element={<BookCollection/>} />
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/register" element={<Register/>} />
      <Route exact path="/user" element={<User/>} />
      <Route exact path="/admin" element={<Admin/>} />
      <Route path="/home/:id" element={<BookDetails />} />
     

      </Routes>
    </div>
  );
}

export default App;
