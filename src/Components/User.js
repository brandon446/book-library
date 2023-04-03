import { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
 import Swal from 'sweetalert2';
import './User.css';

function User() {
  const [currentUser, setCurrentUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);    

  function addFavorite(book) {
    setFavorites([...favorites, book]);
  }


  const token =localStorage.getItem('token');
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
      .then(data => {setCurrentUser(data) 
        // console.log('data', data )
       })

      .catch(error => console.error(error));
  }, [token]);

     console.log(currentUser?.current_user.books) 


  const user= currentUser?.current_user.books.map((book, index) =>{
    
    return(

      
      <div key = {index}className="user-book-card" >
        <h2 className="user-book-title">{book.title} </h2>
        <img src={book.image_url} alt={book.title} className="user-book-image" />
        <p>{book.description}</p>
        <button className="user-book-remove-button" onClick={() => handleRemoveFromCollection(book.id)}>
                Remove from Collection
              </button>
              <button className="user-book-remove-button" onClick={() => handleDownload(book.id)}>
                Download
              </button>
      </div>
    ) 
      
  } )


  function handleDownload(id) {
    fetch(`/books/${id}/download`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => response.blob())
    .then(blob => {
      // Create a URL for the blob object and create a link element to trigger the download
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `book-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    })
    .catch(error => console.error(error));
  }




  function handleRemoveFromCollection(id) {
    // send DELETE request to remove the book from the user's collection
    fetch(`/books/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: currentUser.id,
        book_id: id,
      }),
    })
      .then(response => response.json())
      .then(data => {
        // remove the book from the state
        setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
        // show success alert
        Swal.fire({
          title: 'Removed from collection!',
          icon: 'success',
        });
        document.location.reload()
      })
      .catch(error => console.error(error));
 
    }

  return (
    <div className="user-page">
      <nav className="user-navbar">
        <div className="user-avatar">
          <FaUserCircle size={32} />
          {currentUser && <span>Welcome {currentUser?.current_user.name}!</span>}
        </div>
      </nav>
      <div className="user-collection">
        <h1 className="user-collection-title">My Collection</h1>
        <div className="user-book-cards">
          {user}
        </div>
      </div>
    </div>
  );
}

export default User;