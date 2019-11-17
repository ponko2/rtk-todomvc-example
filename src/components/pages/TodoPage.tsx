import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  Todo,
  addTodo,
  clearCompleted,
  deleteTodo,
  editTodo,
  fetchTodos,
  toggleTodo,
  toggleAllTodo
} from 'api/todos';
import { VisibilityFilter } from 'constants/VisibilityFilter';
import { TodoHeader } from 'components/organisms/TodoHeader';
import { TodoList } from 'components/organisms/TodoList';
import { TodoFooter } from 'components/organisms/TodoFooter';
import styles from './TodoPage.module.css';

export const TodoPage: FunctionComponent = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(VisibilityFilter.SHOW_ALL);

  useEffect(() => {
    (async () => {
      setTodos(await fetchTodos());
    })();
  });

  const todosCount = todos.length;
  const completedCount = todos.filter(({ completed }) => completed).length;

  let visibleTodos;
  switch (filter) {
    case VisibilityFilter.SHOW_ALL:
      visibleTodos = todos;
      break;
    case VisibilityFilter.SHOW_COMPLETED:
      visibleTodos = todos.filter(t => t.completed);
      break;
    case VisibilityFilter.SHOW_ACTIVE:
      visibleTodos = todos.filter(t => !t.completed);
      break;
    default:
      throw new Error(`Unknown filter: ${filter}`);
  }

  return (
    <section className={styles.todoapp}>
      <TodoHeader
        todosCount={todosCount}
        completedCount={completedCount}
        addTodo={async text => {
          await addTodo(text);
          setTodos(await fetchTodos());
        }}
        toggleAllTodo={async () => {
          await toggleAllTodo();
          setTodos(await fetchTodos());
        }}
      />
      <TodoList
        todos={visibleTodos}
        deleteTodo={async id => {
          await deleteTodo(id);
          setTodos(await fetchTodos());
        }}
        editTodo={async (id, text) => {
          await editTodo(id, text);
          setTodos(await fetchTodos());
        }}
        toggleTodo={async id => {
          await toggleTodo(id);
          setTodos(await fetchTodos());
        }}
      />
      <TodoFooter
        filter={filter}
        setFilter={setFilter}
        todosCount={todosCount}
        completedCount={completedCount}
        clearCompleted={async () => {
          await clearCompleted();
          setTodos(await fetchTodos());
        }}
      />
    </section>
  );
};
