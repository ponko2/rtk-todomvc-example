import React, { ChangeEvent, FocusEvent, KeyboardEvent, useState } from 'react';
import { Todo } from 'api/todos';
import { TodoButton } from 'components/atoms/TodoButton';
import styles from './TodoItem.module.css';

interface Props {
  todo: Todo;
  editTodo: (id: number, text: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

export const TodoItem: React.VFC<Props> = ({
  todo,
  editTodo,
  deleteTodo,
  toggleTodo,
}) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(todo.text);

  function saveTodo(id: number, text: string) {
    if (text.length === 0) {
      deleteTodo(id);
    } else {
      editTodo(id, text);
    }
    setEditing(false);
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    saveTodo(todo.id, event.target.value);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value.trim();
    if (event.key === 'Enter') {
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
          autoFocus={true}
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
        <label onDoubleClick={handleDoubleClick}>{todo.text}</label>
        <TodoButton
          className={styles.destroy}
          onClick={() => deleteTodo(todo.id)}
        />
      </div>
    );
  })();

  return <li className={styles.todoItem}>{element}</li>;
};
