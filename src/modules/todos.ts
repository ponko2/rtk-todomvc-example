import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import * as api from "../api/todos";
import { RootState } from "../app/store";

export type TodoState = EntityState<api.Todo> & {
  isLoading: boolean;
  error: string | null;
};

const todoAdapter = createEntityAdapter<api.Todo>();

const initialState: TodoState = todoAdapter.getInitialState({
  isLoading: false,
  error: null,
});

export const fetchTodos = createAsyncThunk("todos/fetch", () => {
  return api.fetchTodos();
});

export const addTodo = createAsyncThunk("todos/add", async (title: string) => {
  await api.addTodo(title);
  return api.fetchTodos();
});

export const deleteTodo = createAsyncThunk(
  "todos/delete",
  async (id: number) => {
    await api.deleteTodo(id);
    return api.fetchTodos();
  }
);

export const editTodo = createAsyncThunk(
  "todos/edit",
  async ({ id, title }: { id: number; title: string }) => {
    await api.editTodo(id, title);
    return api.fetchTodos();
  }
);

export const toggleTodo = createAsyncThunk(
  "todos/toggle",
  async (id: number) => {
    await api.toggleTodo(id);
    return api.fetchTodos();
  }
);

export const toggleAllTodo = createAsyncThunk("todos/toggleAll", async () => {
  await api.toggleAllTodo();
  return api.fetchTodos();
});

export const clearCompleted = createAsyncThunk(
  "todos/clearCompleted",
  async () => {
    await api.clearCompleted();
    return api.fetchTodos();
  }
);

const slice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers(builder) {
    function pending(state: TodoState) {
      state.isLoading = true;
    }

    function fulfilled(
      state: TodoState,
      { payload }: PayloadAction<api.Todo[], string, any, never>
    ) {
      todoAdapter.setAll(state, payload);
      state.isLoading = false;
      state.error = null;
    }

    function rejected(
      state: TodoState,
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

export const { selectAll: selectTodos } = todoAdapter.getSelectors(
  (state: RootState) => state.todos
);

export const selectActiveTodos = createSelector([selectTodos], (todos) =>
  todos.filter((todo) => !todo.completed)
);

export const selectCompletedTodos = createSelector([selectTodos], (todos) =>
  todos.filter((todo) => todo.completed)
);

export const selectTodosCount = createSelector(
  [selectTodos],
  (todos) => todos.length
);

export const selectCompletedTodosCount = createSelector(
  [selectTodos],
  (todos) =>
    todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0)
);

export const todosReducer = slice.reducer;
