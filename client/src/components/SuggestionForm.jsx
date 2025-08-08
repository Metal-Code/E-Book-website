import React, { useState } from 'react';

const SuggestionForm = () => {
  const [form, setForm] = useState({ title: '', author: '', userEmail: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('');
    try {
      const res = await fetch('/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setStatus('Suggestion submitted!');
        setForm({ title: '', author: '', userEmail: '', message: '' });
      } else {
        setStatus('Failed to submit suggestion.');
      }
    } catch {
      setStatus('Failed to submit suggestion.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Suggest a Book</h2>
      <input name="title" placeholder="Book Title" value={form.title} onChange={handleChange} required />
      <input name="author" placeholder="Author" value={form.author} onChange={handleChange} />
      <input name="userEmail" placeholder="Your Email" value={form.userEmail} onChange={handleChange} />
      <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} />
      <button type="submit">Submit</button>
      {status && <div>{status}</div>}
    </form>
  );
};

export default SuggestionForm;
