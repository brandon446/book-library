import React from 'react'
import {Link} from 'react-router-dom';


function HomePageDetails({handleClick}) {


  
  return (
<div className="col-12">
  <div style={{display:'flex'}} className="col-12 " id="slantDiv1">
    <div className="slantContainer">
      <div className="slantedShare" style={{display:"flex",flexDirection:"column", gap:"10px"}}>
        <h4 style={{color:"red"}}>Exclusive Content</h4>
        <h2>Discover Libraries Full of Content for Free</h2>
        <p>As a user, you will get instant access to a library of over a thousand e-book links of where you can buy any book that you want. This library contains a lot of world known bestsellers</p>
       
        
      </div>
      <div className="slantedDonate">
        <img
          src="https://www.pngitem.com/pimgs/m/4-46608_cute-anime-girl-reading-book-anime-girl-reading.png"
          alt="Cute Anime Girl Reading Book"
          style={{ width: '368px', height: '290px' }}
        />
      </div>
    </div>
  </div>
  <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"centre", margin:"50px auto"}}>
    <h1>Browse through a huge library filled with world bestsellers</h1>
    <button onClick={handleClick} id="my-button" className="button" >
          <Link to="/register" className="no-underline" ><h3 style={{ color:"white"}}>Available books</h3></Link>
        </button>
  </div>
</div>

  )
}


export default HomePageDetails