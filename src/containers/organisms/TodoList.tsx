import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { Todo } from 'api/todos';
import { getVisibleTodos } from 'selectors/todos';
import { editTodo, toggleTodo, deleteTodo } from 'modules/todos';
import { TodoList as Component } from 'components/organisms/TodoList';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector<RootState, Todo[]>((state) =>
    getVisibleTodos(state)
  );
  return (
    <Component
      todos={todos}
      editTodo={(id, text) => {
        dispatch(editTodo({ id, text }));
      }}
      toggleTodo={(id) => {
        dispatch(toggleTodo(id));
      }}
      deleteTodo={(id) => {
        dispatch(deleteTodo(id));
      }}
    />
  );
};
