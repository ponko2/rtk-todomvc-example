import React from "react";
import { TodoFooter } from "../../containers/organisms/TodoFooter";
import { TodoHeader } from "../../containers/organisms/TodoHeader";
import { TodoList } from "../../containers/organisms/TodoList";
import styles from "./TodoPage.module.css";

export const TodoPage: React.VFC = () => (
  <section className={styles.todoapp}>
    <TodoHeader />
    <TodoList />
    <TodoFooter />
  </section>
);
