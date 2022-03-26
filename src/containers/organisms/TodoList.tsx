import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Todo } from "../../api/todos";
import { RootState } from "../../app/rootReducer";
import { TodoList as Component } from "../../components/organisms/TodoList";
import { deleteTodo, editTodo, toggleTodo } from "../../modules/todos";
import { getVisibleTodos } from "../../selectors/todos";

export const TodoList: React.VFC = () => {
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
