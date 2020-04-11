import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';
import * as api from 'api/todos';

export interface TodosState {
  todos: api.Todo[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  todos: [],
  isLoading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk('todos/fetch', () => {
  return api.fetchTodos();
});

export const addTodo = createAsyncThunk('todos/add', async (text: string) => {
  await api.addTodo(text);
  return api.fetchTodos();
});

export const deleteTodo = createAsyncThunk(
  'todos/delete',
  async (id: number) => {
    await api.deleteTodo(id);
    return api.fetchTodos();
  }
);

export const editTodo = createAsyncThunk(
  'todos/edit',
  async ({ id, text }: { id: number; text: string }) => {
    await api.editTodo(id, text);
    return api.fetchTodos();
  }
);

export const toggleTodo = createAsyncThunk(
  'todos/toggle',
  async (id: number) => {
    await api.toggleTodo(id);
    return api.fetchTodos();
  }
);

export const toggleAllTodo = createAsyncThunk('todos/toggleAll', async () => {
  await api.toggleAllTodo();
  return api.fetchTodos();
});

export const clearCompleted = createAsyncThunk(
  'todos/clearCompleted',
  async () => {
    await api.clearCompleted();
    return api.fetchTodos();
  }
);

const slice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers(builder) {
    function pending(state: TodosState) {
      state.isLoading = true;
    }

    function fulfilled(
      state: TodosState,
      { payload }: PayloadAction<api.Todo[], string, any, never>
    ) {
      state.todos = payload;
      state.isLoading = false;
      state.error = null;
    }

    function rejected(
      state: TodosState,
      { error }: PayloadAction<unknown, string, any, SerializedError>
    ) {
      state.isLoading = false;
      state.error = error.toString();
    }

    builder.addCase(fetchTodos.pending, pending);
    builder.addCase(fetchTodos.fulfilled, fulfilled);
    builder.addCase(fetchTodos.rejected, rejected);
    builder.addCase(addTodo.pending, pending);
    builder.addCase(addTodo.fulfilled, fulfilled);
    builder.addCase(addTodo.rejected, rejected);
    builder.addCase(deleteTodo.pending, pending);
    builder.addCase(deleteTodo.fulfilled, fulfilled);
    builder.addCase(deleteTodo.rejected, rejected);
    builder.addCase(editTodo.pending, pending);
    builder.addCase(editTodo.fulfilled, fulfilled);
    builder.addCase(editTodo.rejected, rejected);
    builder.addCase(toggleTodo.pending, pending);
    builder.addCase(toggleTodo.fulfilled, fulfilled);
    builder.addCase(toggleTodo.rejected, rejected);
    builder.addCase(toggleAllTodo.pending, pending);
    builder.addCase(toggleAllTodo.fulfilled, fulfilled);
    builder.addCase(toggleAllTodo.rejected, rejected);
    builder.addCase(clearCompleted.pending, pending);
    builder.addCase(clearCompleted.fulfilled, fulfilled);
    builder.addCase(clearCompleted.rejected, rejected);
  },
});

export const todosReducer = slice.reducer;
