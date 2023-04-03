import {Link,  useNavigate } from 'react-router-dom';
import HomePageDetails from './HomePageDetails';
import { useState, useEffect } from 'react';

const limit = 6;
function HomePage() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    fetch('/books')
      .then(response => response.json())
      .then(data => setBooks(data.slice(0, 6))) // This will limit the books to the first 6 items.
      .catch(error => console.error(error));
  }, []);


  const handleClick = () => {
    navigate('/register');
  };


  return (
    <div  className="row  g-12">
      <HomePageDetails handleClick={handleClick}/>
      <div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" style={{display:"flex", justifyContent: "space-around", alignItems: "center", paddingTop:"10px"}}>
      {books.map((book, index) => (
  <div
    id="cardHomePage"
    className=" user-book-card"
    key={book.id}
  >
    <div >
      <img
        src={book.image_url}
        className=" user-book-image"
        alt="Novel"
      />
    </div>
    <h3 className="user-book-title">Title: {book.title}</h3>
  </div>
))}
      
    </div>
      </div>
    </div>
  );
}

export default HomePage;