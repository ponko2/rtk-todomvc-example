import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { getTodosCount, getCompletedTodoCount } from 'selectors/todos';
import { addTodo, toggleAllTodo } from 'modules/todos';
import { TodoHeader as Component } from 'components/organisms/TodoHeader';

export const TodoHeader: React.FC = () => {
  const dispatch = useDispatch();
  const todosCount = useSelector<RootState, number>((state) =>
    getTodosCount(state)
  );
  const completedCount = useSelector<RootState, number>((state) =>
    getCompletedTodoCount(state)
  );
  return (
    <Component
      todosCount={todosCount}
      completedCount={completedCount}
      addTodo={(text) => {
        dispatch(addTodo(text));
      }}
      toggleAllTodo={() => {
        dispatch(toggleAllTodo());
      }}
    ></Component>
  );
};
