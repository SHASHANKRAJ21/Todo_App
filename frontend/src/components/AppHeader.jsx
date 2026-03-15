import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../store/authSlice';
import './AppHeader.css';

function AppHeader() {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const location  = useLocation();
  const user      = useSelector(s => s.auth.user);

  const isAdd   = location.pathname === '/add';
  const isList  = location.pathname === '/todos';

  return (
    <header className="app-header">
      <div className="app-header-inner">

        {/* Logo */}
        <button className="app-header-logo" onClick={() => navigate('/add')}>
          <span className="logo-icon">✓</span>
          <span className="logo-text">Taskly</span>
        </button>

        {/* Nav */}
        <nav className="app-header-nav">
          <button
            className={`app-nav-btn ${isAdd ? 'app-nav-btn--active' : ''}`}
            onClick={() => navigate('/add')}
          >
            <span className="nav-icon">＋</span>
            Add Task
          </button>
          <button
            className={`app-nav-btn ${isList ? 'app-nav-btn--active' : ''}`}
            onClick={() => navigate('/todos')}
          >
            <span className="nav-icon">☰</span>
            My Tasks
          </button>
        </nav>

        {/* User area */}
        <div className="app-header-user">
          <div className="app-user-avatar">
            {user?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <span className="app-user-name">{user?.username}</span>
          <button className="app-header-logout" onClick={() => dispatch(logout())}>
            Sign out
          </button>
        </div>

      </div>
    </header>
  );
}

export default AppHeader;
