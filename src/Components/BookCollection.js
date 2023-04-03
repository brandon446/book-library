import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function BookCollection() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error(error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <form className="d-flex ml-auto">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="btn btn-outline-success" type="submit" style={{backgroundColor:"rgb(248,249,250)"}}>
          Search
        </button>
      </form>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" style={{display:"flex", justifyContent: "space-around", alignItems: "center", paddingTop:"10px"}}>
        {filteredBooks.map(book => (
          <div className="card col-12 col-sm-6 col-md-4 " key={book.id} style={{width:"250px",border:"2px solid blue"}}>
            <div className="card " style={{display:"flex", textAlign:"center"}} >
              <img src={book.image_url} className="card-img-top " alt="Novel" />
            </div>
            <Link to={`/home/${book.id}`}>{book.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookCollection;