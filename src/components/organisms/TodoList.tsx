import { Todo } from "../../api/todos";
import { TodoItem } from "../../components/molecules/TodoItem";
import styles from "./TodoList.module.css";

type Props = {
  todos: Todo[];
  deleteTodo: (id: number) => void;
  editTodo: (id: number, title: string) => void;
  toggleTodo: (id: number) => void;
};

export const TodoList = ({
  todos,
  deleteTodo,
  editTodo,
  toggleTodo,
}: Props): JSX.Element => (
  <section className={styles.todoList}>
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          editTodo={editTodo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  </section>
);
