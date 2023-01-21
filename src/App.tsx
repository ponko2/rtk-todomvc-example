import {
  createRouteConfig,
  Outlet,
  ReactRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { Provider } from "react-redux";
import styles from "./App.module.css";
import { store } from "./app/store";
import { TodoFooter } from "./containers/organisms/TodoFooter";
import { TodoHeader } from "./containers/organisms/TodoHeader";
import { TodoList } from "./containers/organisms/TodoList";
import {
  selectActiveTodos,
  selectCompletedTodos,
  selectTodos,
} from "./modules/todos";

const rootRoute = createRouteConfig({
  component: () => (
    <section className={styles.todoapp}>
      <TodoHeader />
      <Outlet />
      <TodoFooter />
    </section>
  ),
});

const indexRoute = rootRoute.createRoute({
  path: "/",
  component: () => <TodoList selector={selectTodos} />,
});

const activeRoute = rootRoute.createRoute({
  path: "/active",
  component: () => <TodoList selector={selectActiveTodos} />,
});

const completedRoute = rootRoute.createRoute({
  path: "/completed",
  component: () => <TodoList selector={selectCompletedTodos} />,
});

const routeConfig = rootRoute.addChildren([
  indexRoute,
  activeRoute,
  completedRoute,
]);

const router = new ReactRouter({ routeConfig });

export function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
