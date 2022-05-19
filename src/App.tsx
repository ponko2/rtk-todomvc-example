import { Outlet, ReactLocation, Router } from "@tanstack/react-location";
import { useEffect } from "react";
import styles from "./App.module.css";
import { useAppDispatch } from "./app/hooks";
import { TodoFooter } from "./containers/organisms/TodoFooter";
import { TodoHeader } from "./containers/organisms/TodoHeader";
import { TodoList } from "./containers/organisms/TodoList";
import {
  fetchTodos,
  selectActiveTodos,
  selectCompletedTodos,
  selectTodos,
} from "./modules/todos";

const location = new ReactLocation();

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  });

  return (
    <Router
      location={location}
      routes={[
        {
          path: "/",
          element: <TodoList selector={selectTodos} />,
        },
        {
          path: "active",
          element: <TodoList selector={selectActiveTodos} />,
        },
        {
          path: "completed",
          element: <TodoList selector={selectCompletedTodos} />,
        },
      ]}
    >
      <section className={styles.todoapp}>
        <TodoHeader />
        <Outlet />
        <TodoFooter />
      </section>
    </Router>
  );
}
