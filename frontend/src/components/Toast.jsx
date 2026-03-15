import React from 'react';
import './Toast.css';

function Toast({ message, type = 'success' }) {
  if (!message) return null;
  return (
    <div className={`toast toast--${type}`}>
      <span className="toast-icon">{type === 'success' ? '✓' : '⚠'}</span>
      <span className="toast-msg">{message}</span>
    </div>
  );
}

export default Toast;
