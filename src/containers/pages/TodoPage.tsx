import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TodoPage as Component } from "../../components/pages/TodoPage";
import { fetchTodos } from "../../modules/todos";

export const TodoPage: React.VFC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  });

  return <Component />;
};
