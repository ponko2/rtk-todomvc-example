import { combineReducers } from '@reduxjs/toolkit';
import { todosReducer } from 'modules/todos';
import { visibilityFilterReducer } from 'modules/visibilityFilter';

export const rootReducer = combineReducers({
  todos: todosReducer,
  visibilityFilter: visibilityFilterReducer
});

export type RootState = ReturnType<typeof rootReducer>;
