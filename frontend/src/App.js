import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthPage     from './pages/AuthPage';
import AddTodoPage  from './pages/AddTodoPage';
import TodoListPage from './pages/TodoListPage';

function App() {
  const user = useSelector(state => state.auth.user);

  if (!user) return <AuthPage />;

  return (
    <Routes>
      <Route path="/"      element={<Navigate to="/add" replace />} />
      <Route path="/add"   element={<AddTodoPage />} />
      <Route path="/todos" element={<TodoListPage />} />
      <Route path="*"      element={<Navigate to="/add" replace />} />
    </Routes>
  );
}

export default App;
