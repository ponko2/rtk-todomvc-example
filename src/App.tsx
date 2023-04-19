import {
  Outlet,
  RootRoute,
  Route,
  Router,
  RouterProvider,
} from "@tanstack/router";
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

const rootRoute = new RootRoute({
  component: () => (
    <section className={styles["todoapp"]}>
      <TodoHeader />
      <Outlet />
      <TodoFooter />
    </section>
  ),
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <TodoList selector={selectTodos} />,
});

const activeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/active",
  component: () => <TodoList selector={selectActiveTodos} />,
});

const completedRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/completed",
  component: () => <TodoList selector={selectCompletedTodos} />,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  activeRoute,
  completedRoute,
]);

const router = new Router({ routeTree });

export function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
