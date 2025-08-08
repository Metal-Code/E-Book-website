import React, { useState } from 'react';

const BookForm = ({ onSubmit, initialData = {}, onCancel }) => {
  const [form, setForm] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    editor: initialData.editor || ''
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [pdf, setPdf] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = e => {
    if (e.target.name === 'thumbnail') setThumbnail(e.target.files[0]);
    if (e.target.name === 'pdf') setPdf(e.target.files[0]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit && onSubmit(form, { thumbnail, pdf });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{initialData._id ? 'Edit Book' : 'Add Book'}</h2>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
      <input name="editor" placeholder="Editor" value={form.editor} onChange={handleChange} required />
      <input name="thumbnail" type="file" accept="image/*" onChange={handleFile} />
      <input name="pdf" type="file" accept="application/pdf" onChange={handleFile} />
      <button type="submit">Save</button>
      {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
};

export default BookForm;
