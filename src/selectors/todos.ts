import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'app/rootReducer';
import { VisibilityFilter } from 'modules/visibilityFilter';
import { todoAdapter } from 'modules/todos';

const getVisibilityFilter = (state: RootState) => state.visibilityFilter;
const { selectAll: getTodos } = todoAdapter.getSelectors(
  (state: RootState) => state.todos
);

export const getVisibleTodos = createSelector(
  [getVisibilityFilter, getTodos],
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case VisibilityFilter.SHOW_ALL:
        return todos;
      case VisibilityFilter.SHOW_COMPLETED:
        return todos.filter((todo) => todo.completed);
      case VisibilityFilter.SHOW_ACTIVE:
        return todos.filter((todo) => !todo.completed);
      default:
        /* istanbul ignore next */
        throw new Error(`Unknown filter: ${visibilityFilter}`);
    }
  }
);

export const getTodosCount = createSelector(
  [getTodos],
  (todos) => todos.length
);

export const getCompletedTodoCount = createSelector([getTodos], (todos) =>
  todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0)
);
