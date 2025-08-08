import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import BookList from './components/BookList';
import BookCard from './components/BookCard';
import SuggestionForm from './components/SuggestionForm';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || '');

  const handleLogin = (token) => {
    setAdminToken(token);
    localStorage.setItem('adminToken', token);
  };

  const handleLogout = () => {
    setAdminToken('');
    localStorage.removeItem('adminToken');
  };

  return (
    <Router>
      <nav style={{ marginBottom: '2rem' }}>
        <Link to="/">Home</Link> |{' '}
        <Link to="/suggest">Suggest a Book</Link> |{' '}
        {adminToken ? (
          <>
            <Link to="/admin/dashboard">Admin Dashboard</Link> |{' '}
            <button onClick={handleLogout} style={{ display: 'inline', background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <Link to="/admin/login">Admin Login</Link>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/book/:id" element={<BookCard />} />
        <Route path="/suggest" element={<SuggestionForm />} />
        <Route path="/admin/login" element={<AdminLogin onLogin={handleLogin} />} />
        <Route path="/admin/dashboard" element={adminToken ? <AdminDashboard token={adminToken} /> : <Navigate to="/admin/login" />} />
      </Routes>
    </Router>
  );
}

export default App;