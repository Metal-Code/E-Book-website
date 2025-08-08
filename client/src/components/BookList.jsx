import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '1.5rem',
  marginTop: '2rem',
};

const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '1rem',
  background: '#fafafa',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  textAlign: 'center',
};

const imgStyle = {
  maxWidth: '100%',
  maxHeight: '150px',
  objectFit: 'cover',
  borderRadius: '4px',
  marginBottom: '1rem',
};

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/books')
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setFiltered(data);
        setLoading(false);
      });
  }, []);

  const handleSearch = (query) => {
    setFiltered(
      books.filter(b =>
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Book List</h2>
      <SearchBar onSearch={handleSearch} />
      <div style={gridStyle}>
        {filtered.length === 0 && <div style={{gridColumn: '1/-1'}}>No books found.</div>}
        {filtered.map(book => (
          <div key={book._id} style={cardStyle}>
            {book.thumbnail && <img src={`/${book.thumbnail}`} alt={book.title} style={imgStyle} />}
            <h3><Link to={`/book/${book._id}`}>{book.title}</Link></h3>
            <p style={{minHeight: '3em'}}>{book.description}</p>
            <div style={{fontSize: '0.9em', color: '#555'}}>Editor: {book.editor}</div>
            <a href={`/${book.pdf}`} target="_blank" rel="noopener noreferrer" style={{display: 'inline-block', marginTop: '0.5rem', color: '#1976d2'}}>Download PDF</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;