import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'app/rootReducer';
import { VisibilityFilter } from 'modules/visibilityFilter';

const getVisibilityFilter = (state: RootState) => state.visibilityFilter;
const getTodos = (state: RootState) => state.todos.todos;

export const getVisibleTodos = createSelector(
  [getVisibilityFilter, getTodos],
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case VisibilityFilter.SHOW_ALL:
        return todos;
      case VisibilityFilter.SHOW_COMPLETED:
        return todos.filter(todo => todo.completed);
      case VisibilityFilter.SHOW_ACTIVE:
        return todos.filter(todo => !todo.completed);
      default:
        throw new Error(`Unknown filter: ${visibilityFilter}`);
    }
  }
);

export const getTodosCount = createSelector([getTodos], todos => todos.length);

export const getCompletedTodoCount = createSelector([getTodos], todos =>
  todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0)
);
