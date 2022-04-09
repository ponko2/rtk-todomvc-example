import React, { useState } from "react";
import { Todo } from "../../api/todos";
import { TodoButton } from "../../components/atoms/TodoButton";
import styles from "./TodoItem.module.css";

type Props = {
  todo: Todo;
  editTodo: (id: number, title: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
};

export const TodoItem: React.VFC<Props> = ({
  todo,
  editTodo,
  deleteTodo,
  toggleTodo,
}) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(todo.title);

  function saveTodo(id: number, title: string) {
    if (title.length === 0) {
      deleteTodo(id);
    } else {
      editTodo(id, title);
    }
    setEditing(false);
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    saveTodo(todo.id, event.target.value);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value.trim();
    if (event.key === "Enter") {
      saveTodo(todo.id, newValue);
    }
  }

  function handleDoubleClick() {
    setEditing(true);
  }

  const element = (() => {
    if (editing) {
      return (
        <input
          type="text"
          value={value}
          className={styles.edit}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      );
    }
    return (
      <div className={styles.view}>
        <input
          className={styles.toggle}
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        <label onDoubleClick={handleDoubleClick}>{todo.title}</label>
        <TodoButton
          className={styles.destroy}
          onClick={() => deleteTodo(todo.id)}
        />
      </div>
    );
  })();

  return <li className={styles.todoItem}>{element}</li>;
};
