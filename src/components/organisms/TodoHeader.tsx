import React, {
  ChangeEvent,
  FunctionComponent,
  KeyboardEvent,
  useState,
} from 'react';
import styles from './TodoHeader.module.css';

interface Props {
  todosCount: number;
  completedCount: number;
  addTodo: (text: string) => void;
  toggleAllTodo: () => void;
}

export const TodoHeader: FunctionComponent<Props> = ({
  todosCount,
  completedCount,
  addTodo,
  toggleAllTodo,
}) => {
  const [value, setValue] = useState('');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value.trim();
    if (event.key === 'Enter') {
      if (newValue.length !== 0) {
        addTodo(newValue);
      }
      setValue('');
    }
  }

  return (
    <header className={styles.header}>
      <h1>todos</h1>
      <input
        type="text"
        value={value}
        className={styles.newTodo}
        placeholder="What needs to be done?"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
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
          <label onClick={toggleAllTodo} />
        </span>
      )}
    </header>
  );
};
