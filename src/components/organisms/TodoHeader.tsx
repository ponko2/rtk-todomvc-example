import React from "react";
import styles from "./TodoHeader.module.css";

interface Props {
  todosCount: number;
  completedCount: number;
  addTodo: (text: string) => void;
  toggleAllTodo: () => void;
}

export const TodoHeader: React.VFC<Props> = ({
  todosCount,
  completedCount,
  addTodo,
  toggleAllTodo,
}) => {
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
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={true}
      />
      {!!todosCount && (
        <span>
          <input
            className={styles.toggleAll}
            type="checkbox"
            checked={completedCount === todosCount}
            readOnly
          />
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/label-has-associated-control, jsx-a11y/no-noninteractive-element-interactions */}
          <label onClick={toggleAllTodo} />
        </span>
      )}
    </header>
  );
};
