import React from 'react';
import './EmptyState.css';

function EmptyState({ tab, onAddClick }) {
  const isTodo = tab === 'todo';
  return (
    <div className="empty-state">
      <div className="empty-icon">{isTodo ? '📋' : '🎉'}</div>
      <h3 className="empty-title">
        {isTodo ? 'No tasks yet' : 'Nothing completed yet'}
      </h3>
      <p className="empty-sub">
        {isTodo
          ? 'Add your first task to get started.'
          : 'Complete a task to see it here.'}
      </p>
      {isTodo && (
        <button className="empty-btn" onClick={onAddClick}>
          + Add your first task
        </button>
      )}
    </div>
  );
}

export default EmptyState;
