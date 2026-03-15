import React from 'react';
import './TodoItem.css';

function TodoItem({ todo, selected, onSelect, onComplete, onRemove, completing, removing }) {
  const isSelected = selected;

  return (
    <div className={`todo-item ${isSelected ? 'todo-item--selected' : ''} ${todo.completed ? 'todo-item--done' : ''}`}>

      {/* Left: checkbox or done-tick */}
      <div className="todo-item-left">
        {todo.completed ? (
          <span className="todo-tick">✓</span>
        ) : (
          <label className="todo-checkbox-wrap" title="Select task">
            <input
              type="checkbox"
              className="todo-checkbox-input"
              checked={isSelected}
              onChange={() => onSelect(todo.id)}
            />
            <span className="todo-checkmark" />
          </label>
        )}
      </div>

      {/* Middle: title */}
      <div className="todo-item-body">
        <span className="todo-item-title">{todo.title}</span>
        {todo.completed && (
          <span className="todo-item-badge">Completed</span>
        )}
      </div>

      {/* Right: action buttons (only on selected, pending tasks) */}
      {isSelected && !todo.completed && (
        <div className="todo-item-actions">
          <button
            className="todo-act-btn todo-act-btn--complete"
            onClick={() => onComplete()}
            disabled={completing || removing}
            title="Mark complete"
          >
            {completing ? <span className="btn-spinner" /> : '✓ Done'}
          </button>
          <button
            className="todo-act-btn todo-act-btn--remove"
            onClick={() => onRemove()}
            disabled={completing || removing}
            title="Remove task"
          >
            {removing ? <span className="btn-spinner" /> : '✕ Remove'}
          </button>
        </div>
      )}

    </div>
  );
}

export default TodoItem;
