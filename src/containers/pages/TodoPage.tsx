import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTodos } from 'modules/todos';
import { TodoPage as Component } from 'components/pages/TodoPage';

export const TodoPage: React.VFC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  });

  return <Component />;
};
