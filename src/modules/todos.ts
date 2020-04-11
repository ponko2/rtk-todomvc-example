import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as api from 'api/todos';
import { AppThunk } from 'app/store';

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

const slice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    updateTodosStart(state: TodosState) {
      state.isLoading = true;
    },
    updateTodosSuccess(state: TodosState, action: PayloadAction<api.Todo[]>) {
      state.todos = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    updateTodosFailed(state: TodosState, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const todosReducer = slice.reducer;
export const {
  updateTodosStart,
  updateTodosSuccess,
  updateTodosFailed,
} = slice.actions;

export const fetchTodos = (): AppThunk => async (dispatch) => {
  try {
    dispatch(updateTodosStart());
    const todos = await api.fetchTodos();
    dispatch(updateTodosSuccess(todos));
  } catch (err) {
    dispatch(updateTodosFailed(err.toString()));
  }
};

export const addTodo = (text: string): AppThunk => async (dispatch) => {
  try {
    dispatch(updateTodosStart());
    await api.addTodo(text);
    const todos = await api.fetchTodos();
    dispatch(updateTodosSuccess(todos));
  } catch (err) {
    dispatch(updateTodosFailed(err.toString()));
  }
};

export const deleteTodo = (id: number): AppThunk => async (dispatch) => {
  try {
    dispatch(updateTodosStart());
    await api.deleteTodo(id);
    const todos = await api.fetchTodos();
    dispatch(updateTodosSuccess(todos));
  } catch (err) {
    dispatch(updateTodosFailed(err.toString()));
  }
};

export const editTodo = (id: number, text: string): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(updateTodosStart());
    await api.editTodo(id, text);
    const todos = await api.fetchTodos();
    dispatch(updateTodosSuccess(todos));
  } catch (err) {
    dispatch(updateTodosFailed(err.toString()));
  }
};

export const toggleTodo = (id: number): AppThunk => async (dispatch) => {
  try {
    dispatch(updateTodosStart());
    await api.toggleTodo(id);
    const todos = await api.fetchTodos();
    dispatch(updateTodosSuccess(todos));
  } catch (err) {
    dispatch(updateTodosFailed(err.toString()));
  }
};

export const toggleAllTodo = (): AppThunk => async (dispatch) => {
  try {
    dispatch(updateTodosStart());
    await api.toggleAllTodo();
    const todos = await api.fetchTodos();
    dispatch(updateTodosSuccess(todos));
  } catch (err) {
    dispatch(updateTodosFailed(err.toString()));
  }
};

export const clearCompleted = (): AppThunk => async (dispatch) => {
  try {
    dispatch(updateTodosStart());
    await api.clearCompleted();
    const todos = await api.fetchTodos();
    dispatch(updateTodosSuccess(todos));
  } catch (err) {
    dispatch(updateTodosFailed(err.toString()));
  }
};
