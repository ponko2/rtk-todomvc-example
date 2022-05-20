import React from "react";
import styles from "./TodoHeader.module.css";

type Props = {
  todosCount: number;
  completedCount: number;
  addTodo: (title: string) => void;
  toggleAllTodo: () => void;
};

export const TodoHeader = ({
  todosCount,
  completedCount,
  addTodo,
  toggleAllTodo,
}: Props): JSX.Element => {
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value.trim();
    if (event.key === "Enter") {
      if (newValue.length !== 0) {
        addTodo(newValue);
      }
      event.currentTarget.value = "";
    }
  }

  return (
    <header className={styles.header}>
      <h1>todos</h1>
      <input
        type="text"
        className={styles.newTodo}
        placeholder="What needs to be done?"
        onKeyDown={handleKeyDown}
      />
      {!!todosCount && (
        <label className={styles.toggleAll}>
          <input
            type="checkbox"
            checked={completedCount === todosCount}
            onClick={toggleAllTodo}
            readOnly
          />
          <span>Mark all as complete</span>
        </label>
      )}
    </header>
  );
};
