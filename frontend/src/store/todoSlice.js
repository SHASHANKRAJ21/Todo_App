import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../services/api';

export const loadTodos = createAsyncThunk('todos/load', async (userId, { rejectWithValue }) => {
  try {
    const res = await api.fetchTodos(userId);
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to load tasks');
  }
});

export const addTodo = createAsyncThunk('todos/add', async ({ userId, title }, { rejectWithValue }) => {
  try {
    const res = await api.createTodo(userId, { title });
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to add task');
  }
});

export const completeTodo = createAsyncThunk('todos/complete', async (id, { rejectWithValue }) => {
  try {
    const res = await api.toggleTodo(id);
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update task');
  }
});

export const removeTodo = createAsyncThunk('todos/remove', async (id, { rejectWithValue }) => {
  try {
    await api.deleteTodo(id);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to remove task');
  }
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos:          [],
    loading:        false,
    error:          null,
    successMessage: null,
    selectedId:     null,
  },
  reducers: {
    selectTodo: (state, action) => {
      state.selectedId = state.selectedId === action.payload ? null : action.payload;
    },
    clearSelection: (state) => { state.selectedId = null; },
    clearMessages:  (state) => { state.error = null; state.successMessage = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTodos.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(loadTodos.fulfilled, (state, action) => { state.loading = false; state.todos = action.payload; })
      .addCase(loadTodos.rejected,  (state, action) => { state.loading = false; state.error = action.payload; });

    builder
      .addCase(addTodo.pending,   (state) => { state.error = null; })
      .addCase(addTodo.fulfilled, (state, action) => { state.todos.unshift(action.payload); })
      .addCase(addTodo.rejected,  (state, action) => { state.error = action.payload; });

    builder
      .addCase(completeTodo.fulfilled, (state, action) => {
        const idx = state.todos.findIndex(t => t.id === action.payload.id);
        if (idx !== -1) state.todos[idx] = action.payload;
        state.successMessage = 'Task marked as completed!';
        state.selectedId     = null;
      })
      .addCase(completeTodo.rejected, (state, action) => { state.error = action.payload; });

    builder
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.todos          = state.todos.filter(t => t.id !== action.payload);
        state.successMessage = 'Removed Successfully';
        state.selectedId     = null;
      })
      .addCase(removeTodo.rejected, (state, action) => { state.error = action.payload; });
  },
});

export const { selectTodo, clearSelection, clearMessages } = todoSlice.actions;
export default todoSlice.reducer;
