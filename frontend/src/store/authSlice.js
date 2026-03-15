import { createSlice } from '@reduxjs/toolkit';

const stored = (() => {
  try { return JSON.parse(localStorage.getItem('todo_user')); }
  catch { return null; }
})();

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: stored },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('todo_user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('todo_user');
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
