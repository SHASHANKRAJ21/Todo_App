import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadTodos, removeTodo, completeTodo, selectTodo, clearSelection, clearMessages } from '../store/todoSlice';
import AppHeader from '../components/AppHeader';
import TodoItem from '../components/TodoItem';
import StatsBar from '../components/StatsBar';
import SearchBar from '../components/SearchBar';
import Toast from '../components/Toast';
import EmptyState from '../components/EmptyState';
import ConfirmModal from '../components/ConfirmModal';
import './TodoListPage.css';

function TodoListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user     = useSelector(s => s.auth.user);
  const { todos, loading, error, successMessage, selectedId } = useSelector(s => s.todos);

  const [activeTab,  setActiveTab]  = useState('todo');
  const [showModal,  setShowModal]  = useState(false);
  const [completing, setCompleting] = useState(false);
  const [removing,   setRemoving]   = useState(false);
  const [search,     setSearch]     = useState('');

  // Fetch on mount
  useEffect(() => {
    dispatch(loadTodos(user.id));
    return () => { dispatch(clearSelection()); };
  }, [dispatch, user.id]);

  // Auto-clear toasts
  useEffect(() => {
    if (successMessage || error) {
      const t = setTimeout(() => dispatch(clearMessages()), 3000);
      return () => clearTimeout(t);
    }
  }, [successMessage, error, dispatch]);

  // Filter by tab then search
  const todoItems      = todos.filter(t => !t.completed);
  const completedItems = todos.filter(t =>  t.completed);
  const tabItems       = activeTab === 'todo' ? todoItems : completedItems;
  const visibleItems   = search.trim()
    ? tabItems.filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
    : tabItems;

  const selectedTodo = todos.find(t => t.id === selectedId);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearch('');
    dispatch(clearSelection());
  };

  const handleComplete = async () => {
    if (!selectedId) return;
    setCompleting(true);
    await dispatch(completeTodo(selectedId));
    setCompleting(false);
    setActiveTab('completed');
  };

  const handleRemoveClick = () => { if (!selectedId) return; setShowModal(true); };

  const handleConfirmRemove = async () => {
    setRemoving(true);
    await dispatch(removeTodo(selectedId));
    setRemoving(false);
    setShowModal(false);
  };

  return (
    <div className="list-page">
      <AppHeader />

      <div className="list-main">

        {/* Stats bar */}
        {todos.length > 0 && <StatsBar todos={todos} />}

        {/* Tabs */}
        <div className="list-tabs">
          <button
            className={`list-tab ${activeTab === 'todo' ? 'list-tab--active' : ''}`}
            onClick={() => handleTabChange('todo')}
          >
            <span className="tab-label">To Do</span>
            <span className={`tab-badge ${activeTab === 'todo' ? 'tab-badge--accent' : ''}`}>
              {todoItems.length}
            </span>
          </button>
          <button
            className={`list-tab ${activeTab === 'completed' ? 'list-tab--active' : ''}`}
            onClick={() => handleTabChange('completed')}
          >
            <span className="tab-label">Completed</span>
            <span className={`tab-badge ${activeTab === 'completed' ? 'tab-badge--green' : ''}`}>
              {completedItems.length}
            </span>
          </button>
        </div>

        {/* Search bar */}
        {tabItems.length > 0 && (
          <SearchBar value={search} onChange={setSearch} count={visibleItems.length} />
        )}

        {/* Toasts */}
        <Toast message={successMessage} type="success" />
        <Toast message={error}          type="error" />

        {/* Content */}
        {loading ? (
          <div className="list-loading">
            <div className="list-spinner" />
            <p>Loading your tasks…</p>
          </div>

        ) : visibleItems.length === 0 && search ? (
          <div className="list-no-results">
            <span className="no-results-icon">🔍</span>
            <p>No tasks match "<strong>{search}</strong>"</p>
            <button className="no-results-clear" onClick={() => setSearch('')}>Clear search</button>
          </div>

        ) : visibleItems.length === 0 ? (
          <EmptyState tab={activeTab} onAddClick={() => navigate('/add')} />

        ) : (
          <div className="list-items">
            {visibleItems.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                selected={selectedId === todo.id}
                onSelect={(id) => dispatch(selectTodo(id))}
                onComplete={handleComplete}
                onRemove={handleRemoveClick}
                completing={completing}
                removing={removing}
              />
            ))}
          </div>
        )}

      </div>

      {showModal && (
        <ConfirmModal
          message={`Are you sure you want to remove "${selectedTodo?.title}"?`}
          onConfirm={handleConfirmRemove}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default TodoListPage;