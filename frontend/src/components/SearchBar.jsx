import React from 'react';
import './SearchBar.css';

function SearchBar({ value, onChange, count }) {
  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input
        className="search-input"
        type="text"
        placeholder="Search tasks..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      {value && (
        <button className="search-clear" onClick={() => onChange('')}>✕</button>
      )}
      {value && (
        <span className="search-count">{count} found</span>
      )}
    </div>
  );
}

export default SearchBar;
