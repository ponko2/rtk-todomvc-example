import { TodoItem } from "../../components/molecules/TodoItem";
import { Todo } from "../../models/todos";
import styles from "./TodoList.module.css";

type Props = {
  todos: Todo[];
  deleteTodo: (id: number) => void;
  editTodo: (todo: Omit<Todo, "completed">) => void;
  toggleTodo: (id: number) => void;
};

export function TodoList({
  todos,
  deleteTodo,
  editTodo,
  toggleTodo,
}: Props): JSX.Element {
  return (
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
}
