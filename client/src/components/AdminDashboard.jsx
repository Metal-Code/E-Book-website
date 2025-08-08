import React, { useEffect, useState } from 'react';
import BookForm from './BookForm';

const AdminDashboard = ({ token }) => {
  const [books, setBooks] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch books
  const fetchBooks = () => {
    fetch('/api/books')
      .then(res => res.json())
      .then(setBooks);
  };

  // Fetch suggestions
  const fetchSuggestions = () => {
    fetch('/api/suggestions', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setSuggestions);
  };

  useEffect(() => {
    fetchBooks();
    fetchSuggestions();
  }, []);

  // Delete book
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this book?')) return;
    const res = await fetch(`/api/books/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      setMessage('Book deleted.');
      fetchBooks();
    } else {
      setMessage('Failed to delete book.');
    }
  };

  // Add/edit book
  const handleSave = async (data, files) => {
    setMessage('');
    const formData = new FormData();
    Object.entries(data).forEach(([k, v]) => formData.append(k, v));
    if (files.thumbnail) formData.append('thumbnail', files.thumbnail);
    if (files.pdf) formData.append('pdf', files.pdf);
    let url = '/api/books', method = 'POST';
    if (editing) {
      url += `/${editing._id}`;
      method = 'PUT';
    }
    const res = await fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });
    if (res.ok) {
      setMessage('Book saved.');
      setShowForm(false);
      setEditing(null);
      fetchBooks();
    } else {
      setMessage('Failed to save book.');
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {message && <div>{message}</div>}
      <button onClick={() => { setShowForm(true); setEditing(null); }}>Add Book</button>
      {showForm && (
        <BookForm
          onSubmit={handleSave}
          initialData={editing}
          onCancel={() => { setShowForm(false); setEditing(null); }}
        />
      )}
      <h3>Books</h3>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            {book.title} - {book.editor}
            <button onClick={() => { setEditing(book); setShowForm(true); }}>Edit</button>
            <button onClick={() => handleDelete(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>Suggestions</h3>
      <ul>
        {suggestions.map(s => (
          <li key={s._id}>
            <b>{s.title}</b> by {s.author || 'Unknown'} ({s.userEmail || 'No email'})<br />
            {s.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;