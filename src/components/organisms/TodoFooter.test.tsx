import {
  RootRoute,
  Route,
  Router,
  RouterProvider,
  createMemoryHistory,
} from "@tanstack/router";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { TodoFooter } from "./TodoFooter";

const history = createMemoryHistory({ initialEntries: ["/"] });

function createRouter(element: JSX.Element) {
  const rootRoute = new RootRoute({ component: () => element });
  const routeTree = rootRoute.addChildren([
    new Route({ getParentRoute: () => rootRoute, path: "/" }),
    new Route({ getParentRoute: () => rootRoute, path: "/active" }),
    new Route({ getParentRoute: () => rootRoute, path: "/completed" }),
  ]);
  return new Router({ routeTree, history });
}

describe("<TodoFooter/>", () => {
  it("全てを表示", async () => {
    const clearCompletedSpy = jest.fn();
    const router = createRouter(
      <TodoFooter
        todosCount={2}
        completedCount={1}
        clearCompleted={clearCompletedSpy}
      />,
    );

    history.replace("/active", {});

    render(<RouterProvider router={router} />);

    const button = await screen.findByText("All");

    expect(button).not.toHaveClass("selected");

    fireEvent.click(button);

    await waitFor(() => expect(button).toHaveClass("selected"));
    await waitFor(() => expect(clearCompletedSpy).not.toHaveBeenCalled());
  });

  it("未完了のものを表示", async () => {
    const clearCompletedSpy = jest.fn();
    const router = createRouter(
      <TodoFooter
        todosCount={2}
        completedCount={1}
        clearCompleted={clearCompletedSpy}
      />,
    );

    render(<RouterProvider router={router} />);

    const button = await screen.findByText("Active");

    expect(button).not.toHaveClass("selected");

    fireEvent.click(button);

    await waitFor(() => expect(button).toHaveClass("selected"));
    await waitFor(() => expect(clearCompletedSpy).not.toHaveBeenCalled());
  });

  it("完了したものを表示", async () => {
    const clearCompletedSpy = jest.fn();
    const router = createRouter(
      <TodoFooter
        todosCount={2}
        completedCount={1}
        clearCompleted={clearCompletedSpy}
      />,
    );

    render(<RouterProvider router={router} />);

    const button = await screen.findByText("Completed");

    expect(button).not.toHaveClass("selected");

    fireEvent.click(button);

    await waitFor(() => expect(button).toHaveClass("selected"));
    await waitFor(() => expect(clearCompletedSpy).not.toHaveBeenCalled());
  });

  it("完了したものを削除", async () => {
    const clearCompletedSpy = jest.fn();
    const router = createRouter(
      <TodoFooter
        todosCount={2}
        completedCount={1}
        clearCompleted={clearCompletedSpy}
      />,
    );

    render(<RouterProvider router={router} />);

    fireEvent.click(await screen.findByText("Clear completed"));

    await waitFor(() => expect(clearCompletedSpy).toHaveBeenCalledTimes(1));
  });
});
