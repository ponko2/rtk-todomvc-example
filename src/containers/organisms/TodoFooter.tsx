import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { clearCompleted } from 'modules/todos';
import {
  VisibilityFilter,
  setVisibilityFilter,
} from 'modules/visibilityFilter';
import { getTodosCount, getCompletedTodoCount } from 'selectors/todos';

import { TodoFooter as Component } from 'components/organisms/TodoFooter';

export const TodoFooter: React.VFC = () => {
  const dispatch = useDispatch();
  const visibilityFilter = useSelector<RootState, VisibilityFilter>(
    (state) => state.visibilityFilter
  );
  const todosCount = useSelector<RootState, number>((state) =>
    getTodosCount(state)
  );
  const completedCount = useSelector<RootState, number>((state) =>
    getCompletedTodoCount(state)
  );
  return (
    <Component
      filter={visibilityFilter}
      setFilter={(filter) => {
        dispatch(setVisibilityFilter(filter));
      }}
      todosCount={todosCount}
      completedCount={completedCount}
      clearCompleted={() => {
        dispatch(clearCompleted());
      }}
    ></Component>
  );
};
