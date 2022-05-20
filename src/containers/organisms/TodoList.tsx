import { Todo } from "../../api/todos";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { TodoList as Component } from "../../components/organisms/TodoList";
import {
  deleteTodo,
  editTodo,
  TodoState,
  toggleTodo,
} from "../../modules/todos";

type Props = {
  selector: (state: { todos: TodoState }) => Todo[];
};

export const TodoList = ({ selector }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selector);
  return (
    <Component
      todos={todos}
      editTodo={(id, title) => {
        dispatch(editTodo({ id, title }));
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
