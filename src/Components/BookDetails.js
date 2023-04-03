import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  console.log('token ', token);  
  
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
    .then(data => {setCurrentUser(data)})
    .catch(error => console.error(error));
  }, [token]);
  
  console.log(currentUser?.current_user.books);
  
  const userId = currentUser?.current_user.id;
  


  useEffect(() => {
    fetch(`/books/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBook(data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleFavourite = async (bookId) => {
    try {
      const response = await fetch(`/users/${userId}/add_book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ book_id: bookId })
      })
      .then((response)=>response.json())
      .then(navigate('/user'))

      const data = await response.json();

      if (response.ok) {
        console.log(data.success);
        // Do something with the success message, e.g. show a notification
      } else {
        console.log(data.error);
        // Do something with the error message, e.g. show an error alert
      }
    } catch (error) {
      console.error(error);
      // Handle network error, e.g. show a generic error message
    }
  }

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container_card'>
      <div className="card" style={{width: "40rem", display:"flex", border:"2px solid blue"}}>
        <div className="card-body">
          <h1 className="card-title">Title: {book.title}</h1>
          <h5 className="card-title">Description: {book.description}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary"><p>Author: {book.author}</p></h6>
          <p className="card-text">Pages: {book.pages}</p>
          <button onClick={() => handleFavourite(book.id)}><i className="fa-regular fa-heart"></i></button>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;