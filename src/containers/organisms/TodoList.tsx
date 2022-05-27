import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { TodoList as Component } from "../../components/organisms/TodoList";
import { Todo } from "../../models/todos";
import {
  deleteTodo,
  editTodo,
  fetchTodos,
  TodoState,
  toggleTodo,
} from "../../modules/todos";

type Props = {
  selector: (state: { todos: TodoState }) => Todo[];
};

export const TodoList = ({ selector }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selector);

  useEffect(() => {
    void dispatch(fetchTodos());
  });

  return (
    <Component
      todos={todos}
      editTodo={(todo) => {
        void dispatch(editTodo(todo));
      }}
      toggleTodo={(id) => {
        void dispatch(toggleTodo(id));
      }}
      deleteTodo={(id) => {
        void dispatch(deleteTodo(id));
      }}
    />
  );
};
