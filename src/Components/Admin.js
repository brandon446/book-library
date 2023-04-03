import React, { useEffect, useContext, useState } from "react";
import "./Admin.css";

function Admin() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [image_url, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const [updateId, setUpdateId] = useState(null);
  const [updatedBook, setUpdatedBook] = useState({
    title: "",
    image_url: "",
    description: "",
  });

  useEffect(() => {
    fetch("/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error(error));
  }, []);

  function handleUpdate(e) {
    e.preventDefault();
    fetch(`/books/${updateId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBook),
    })
      .then((res) => res.json())
      .then((data) => {
        setBooks(
          books.map((book) => {
            if (book.id === updateId) {
              return data;
            }
            return book;
          })
        );
        setUpdateId(null);
        setUpdatedBook({ title: "", image_url: "", description: "" });
      })
      .catch((error) => console.error(error));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (updateId) {
      handleUpdate(e);
    } else {
      const newBook = { title, image_url, description };
      setBooks([...books, newBook]);
      setTitle("");
      setImage("");
      setDescription("");
      fetch("/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      })
        .then((res) => res.json())
        .then(() => document.location.reload())
        .catch((error) => console.error(error));
    }
  }

  function handleClick(id) {
    fetch(`/books/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(() => document.location.reload())
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    if (token) {
      fetch("/logged", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
        })
        .catch((error) => console.error(error));
    }
  }, [token]);

  function handleDownload(id) {
    fetch(`/books/${id}/download`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Create a URL for the blob object and create a link element to trigger the download
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `book-${id}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => console.error(error));
  }

  return (
    
    <div className="admin">
      <div className="admin-header">
<h1>Welcome, {user ? user.username : "Admin"}</h1>
{user && (
<button
className="logout-btn"
onClick={() => {
localStorage.removeItem("token");
setUser(null);
}}
>
Logout
</button>
)}
</div>
<div className="admin-body">
<div className="book-form">
<h2>Add a New Book</h2>
<form onSubmit={handleSubmit}>
<div className="form-group">
<label htmlFor="title">Title:</label>
<input
type="text"
name="title"
id="title"
value={title}
onChange={(e) => setTitle(e.target.value)}
/>
</div>
<div className="form-group">
<label htmlFor="image_url">Image URL:</label>
<input
type="text"
name="image_url"
id="image_url"
value={image_url}
onChange={(e) => setImage(e.target.value)}
/>
</div>
<div className="form-group">
<label htmlFor="description">Description:</label>
<textarea
name="description"
id="description"
value={description}
onChange={(e) => setDescription(e.target.value)}
></textarea>
</div>
<button type="submit">{updateId ? "Update" : "Add Book"}</button>
</form>
</div>
<div className="book-list">
<h2>Book List</h2>
{books.map((book) => (
<div key={book.id} className="book-item">
<img src={book.image_url} alt={book.title} />
<div className="book-details">
<h3>{book.title}</h3>
<p>{book.description}</p>
<div className="book-buttons">
<button
className="delete-btn"
onClick={() => handleClick(book.id)}
>
Delete
</button>
<button
className="update-btn"
onClick={() => {
setUpdateId(book.id);
setUpdatedBook({
title: book.title,
image_url: book.image_url,
description: book.description,
});
}}
>
Update
</button>
<button
className="download-btn"
onClick={() => handleDownload(book.id)}
>
Download
</button>
</div>
</div>
</div>
))}
</div>
</div>
</div>

);
}

export default Admin;