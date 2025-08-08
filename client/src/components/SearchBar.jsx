import React from 'react';

const SearchBar = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search books..."
      onChange={e => onSearch(e.target.value)}
      style={{ marginBottom: '1rem', width: '100%', padding: '0.5rem' }}
    />
  );
};

export default SearchBar;
