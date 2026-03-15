import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/authSlice';
import { login, signup } from '../services/api';
import './AuthPage.css';

function AuthPage() {
  const dispatch = useDispatch();
  const [mode,     setMode]     = useState('login');
  const [form,     setForm]     = useState({ username: '', email: '', password: '' });
  const [errors,   setErrors]   = useState({});
  const [apiError, setApiError] = useState('');
  const [loading,  setLoading]  = useState(false);

  const validate = () => {
    const errs = {};
    if (mode === 'signup' && !form.username.trim()) errs.username = 'Username is required';
    if (!form.email.trim())                         errs.email    = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email))     errs.email    = 'Invalid email format';
    if (!form.password.trim())                      errs.password = 'Password is required';
    return errs;
  };

  const handleChange = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    setErrors(p => ({ ...p, [e.target.name]: '' }));
    setApiError('');
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const res = mode === 'login'
        ? await login({ email: form.email, password: form.password })
        : await signup({ username: form.username, email: form.email, password: form.password });
      dispatch(setUser(res.data.data));
    } catch (err) {
      setApiError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => { if (e.key === 'Enter') handleSubmit(); };

  const switchMode = () => {
    setMode(m => m === 'login' ? 'signup' : 'login');
    setErrors({}); setApiError('');
    setForm({ username: '', email: '', password: '' });
  };

  return (
    <div className="auth-page">
      {/* Left panel — decorative */}
      <div className="auth-panel">
        <div className="auth-panel-inner">
          <div className="auth-panel-logo">
            <span className="panel-logo-icon">✓</span>
            <span className="panel-logo-text">Taskly</span>
          </div>
          <h1 className="auth-panel-headline">Stay on top of everything.</h1>
          <p className="auth-panel-sub">Manage your tasks, track your progress, and get things done.</p>
          <div className="auth-panel-features">
            {['Add and organise tasks instantly','Track progress with visual stats','Simple, clean and fast'].map((f, i) => (
              <div className="auth-feature" key={i}>
                <span className="auth-feature-dot" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="auth-form-side">
        <div className="auth-card">
          <h2 className="auth-title">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="auth-sub">
            {mode === 'login' ? 'Sign in to continue to Taskly' : 'Start managing your tasks today'}
          </p>

          {/* Tabs */}
          <div className="auth-tabs">
            <button className={`auth-tab ${mode === 'login'  ? 'active' : ''}`} onClick={() => mode !== 'login'  && switchMode()}>Login</button>
            <button className={`auth-tab ${mode === 'signup' ? 'active' : ''}`} onClick={() => mode !== 'signup' && switchMode()}>Sign Up</button>
          </div>

          {/* API error */}
          {apiError && <div className="auth-api-error">⚠ {apiError}</div>}

          {/* Username (signup only) */}
          {mode === 'signup' && (
            <div className="auth-field">
              <label className="auth-label">Username</label>
              <input name="username" type="text" value={form.username}
                onChange={handleChange} onKeyDown={handleKey}
                placeholder="Your display name"
                className={`auth-input ${errors.username ? 'input-error' : ''}`} />
              {errors.username && <span className="auth-err">{errors.username}</span>}
            </div>
          )}

          {/* Email */}
          <div className="auth-field">
            <label className="auth-label">Email address</label>
            <input name="email" type="email" value={form.email}
              onChange={handleChange} onKeyDown={handleKey}
              placeholder="you@example.com"
              className={`auth-input ${errors.email ? 'input-error' : ''}`} />
            {errors.email && <span className="auth-err">{errors.email}</span>}
          </div>

          {/* Password */}
          <div className="auth-field">
            <label className="auth-label">Password</label>
            <input name="password" type="password" value={form.password}
              onChange={handleChange} onKeyDown={handleKey}
              placeholder="••••••••"
              className={`auth-input ${errors.password ? 'input-error' : ''}`} />
            {errors.password && <span className="auth-err">{errors.password}</span>}
          </div>

          {/* Submit */}
          <button className="auth-submit" onClick={handleSubmit} disabled={loading}>
            {loading ? <span className="auth-spinner" /> : (mode === 'login' ? 'Sign In' : 'Create Account')}
          </button>

          <p className="auth-switch">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button className="auth-switch-btn" onClick={switchMode}>
              {mode === 'login' ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
