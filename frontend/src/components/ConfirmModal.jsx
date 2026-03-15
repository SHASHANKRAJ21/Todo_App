import React from 'react';
import './ConfirmModal.css';

function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-icon-wrap">
            <span className="modal-icon">🗑</span>
          </div>
          <button className="modal-close" onClick={onCancel}>✕</button>
        </div>
        <h3 className="modal-title">Remove Task</h3>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button className="modal-btn modal-btn--cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="modal-btn modal-btn--confirm" onClick={onConfirm}>
            Yes, Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
