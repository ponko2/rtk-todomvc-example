import React, { FunctionComponent } from 'react';
import { Todo } from 'api/todos';
import { TodoItem } from 'components/molecules/TodoItem';
import styles from './TodoList.module.css';

interface Props {
  todos: Todo[];
  deleteTodo: (id: number) => void;
  editTodo: (id: number, text: string) => void;
  toggleTodo: (id: number) => void;
}

export const TodoList: FunctionComponent<Props> = ({
  todos,
  deleteTodo,
  editTodo,
  toggleTodo,
}) => {
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
};
