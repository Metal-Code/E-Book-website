import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookCard = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/books/${id}`)
      .then(res => res.json())
      .then(data => {
        setBook(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!book) return <div>Book not found.</div>;

  return (
    <div>
      <h2>{book.title}</h2>
      <p>{book.description}</p>
      {book.thumbnail && <img src={`/${book.thumbnail}`} alt={book.title} style={{ maxWidth: 200 }} />}
      <div>Editor: {book.editor}</div>
      <a href={`/${book.pdf}`} target="_blank" rel="noopener noreferrer">Download PDF</a>
    </div>
  );
};

export default BookCard;
