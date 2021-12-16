import React from 'react';
import { TodoHeader } from 'containers/organisms/TodoHeader';
import { TodoList } from 'containers/organisms/TodoList';
import { TodoFooter } from 'containers/organisms/TodoFooter';
import styles from './TodoPage.module.css';

export const TodoPage: React.VFC = () => (
  <section className={styles.todoapp}>
    <TodoHeader />
    <TodoList />
    <TodoFooter />
  </section>
);
