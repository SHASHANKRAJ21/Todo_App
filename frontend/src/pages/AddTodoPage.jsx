import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTodo } from '../store/todoSlice';
import AppHeader from '../components/AppHeader';
import './AddTodoPage.css';


function AddTodoPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user     = useSelector(s => s.auth.user);
  const apiError = useSelector(s => s.todos.error);

  const [title,    setTitle]    = useState('');
  const [inputErr, setInputErr] = useState('');
  const [adding,   setAdding]   = useState(false);

  const handleAdd = async () => {
    const trimmed = title.trim();
    if (!trimmed) { setInputErr('Task title is required'); return; }
    setAdding(true);
    const result = await dispatch(addTodo({ userId: user.id, title: trimmed }));
    setAdding(false);
    if (!result.error) {
      setTitle('');
      setInputErr('');
      navigate('/todos');
    }
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
    if (inputErr) setInputErr('');
  };

  const handleKey = (e) => { if (e.key === 'Enter') handleAdd(); };

  return (
    <div className="add-page">
      <AppHeader />

      <main className="add-main">
        <div className="add-layout">

          {/* Form card */}
          <div className="add-card">
            <div className="add-card-top">
              <div className="add-card-icon">＋</div>
              <div>
                <h2 className="add-card-title">Add New Task</h2>
                <p className="add-card-sub">Enter a task below and press Add or hit Enter</p>
              </div>
            </div>

            {/* Tab row */}
            <div className="add-tabs">
              <button className="add-tab add-tab--active">
                <span className="add-tab-dot" /> To Do
              </button>
              <button className="add-tab" onClick={() => navigate('/todos')}>
                All Tasks
              </button>
            </div>

            {/* API-level error */}
            {apiError && (
              <div className="add-api-error">
                <span>⚠</span> {apiError}
              </div>
            )}

            {/* Input */}
            <div className="add-input-group">
              <label className="add-input-label">Task Title <span className="required-star">*</span></label>
              <div className="add-input-row">
                <input
                  type="text"
                  value={title}
                  onChange={handleChange}
                  onKeyDown={handleKey}
                  placeholder="What needs to be done?"
                  className={`add-input ${inputErr ? 'input-error' : ''}`}
                  disabled={adding}
                  maxLength={200}
                  autoFocus
                />
                <button className="add-btn" onClick={handleAdd} disabled={adding}>
                  {adding ? <span className="add-spinner" /> : '+ Add'}
                </button>
              </div>
              {inputErr && (
                <p className="add-inline-err">
                  <span className="err-icon">⚠</span> {inputErr}
                </p>
              )}
              <div className="add-char-count">{title.length}/200</div>
            </div>

            <button className="add-view-link" onClick={() => navigate('/todos')}>
              View My Task List →
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}

export default AddTodoPage;
