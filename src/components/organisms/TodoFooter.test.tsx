import {
  createMemoryHistory,
  ReactLocation,
  Router,
} from "@tanstack/react-location";
import { fireEvent, render, screen } from "@testing-library/react";
import { TodoFooter } from "./TodoFooter";

const history = createMemoryHistory({
  initialEntries: ["/"],
});

const location = new ReactLocation({ history });

describe("<TodoFooter/>", () => {
  it("全てを表示", () => {
    const clearCompletedSpy = jest.fn();

    history.replace("/active");

    render(
      <Router location={location} routes={[]}>
        <TodoFooter
          todosCount={2}
          completedCount={1}
          clearCompleted={clearCompletedSpy}
        />
      </Router>
    );

    const button = screen.getByText("All");

    expect(button).not.toHaveClass("selected");

    fireEvent.click(button);

    expect(button).toHaveClass("selected");
    expect(clearCompletedSpy).not.toHaveBeenCalled();
  });

  it("未完了のものを表示", () => {
    const clearCompletedSpy = jest.fn();

    render(
      <Router location={location} routes={[]}>
        <TodoFooter
          todosCount={2}
          completedCount={1}
          clearCompleted={clearCompletedSpy}
        />
      </Router>
    );

    const button = screen.getByText("Active");

    expect(button).not.toHaveClass("selected");

    fireEvent.click(button);

    expect(button).toHaveClass("selected");
    expect(clearCompletedSpy).not.toHaveBeenCalled();
  });

  it("完了したものを表示", () => {
    const clearCompletedSpy = jest.fn();

    render(
      <Router location={location} routes={[]}>
        <TodoFooter
          todosCount={2}
          completedCount={1}
          clearCompleted={clearCompletedSpy}
        />
      </Router>
    );

    const button = screen.getByText("Completed");

    expect(button).not.toHaveClass("selected");

    fireEvent.click(button);

    expect(button).toHaveClass("selected");
    expect(clearCompletedSpy).not.toHaveBeenCalled();
  });

  it("完了したものを削除", () => {
    const clearCompletedSpy = jest.fn();

    render(
      <Router location={location} routes={[]}>
        <TodoFooter
          todosCount={2}
          completedCount={1}
          clearCompleted={clearCompletedSpy}
        />
      </Router>
    );

    fireEvent.click(screen.getByText("Clear completed"));

    expect(clearCompletedSpy).toHaveBeenCalledTimes(1);
  });
});
