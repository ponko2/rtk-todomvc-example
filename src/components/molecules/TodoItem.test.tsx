import { fireEvent, render, screen } from "@testing-library/react";
import { Todo } from "../../api/todos";
import { TodoItem } from "./TodoItem";

describe("<TodoItem/>", () => {
  it("Todoを修正後フォーカスアウト", () => {
    const todo: Todo = { id: 1, completed: false, text: "foo" };
    const editTodo = jest.fn();
    const deleteTodo = jest.fn();
    const toggleTodo = jest.fn();
    const { asFragment } = render(
      <TodoItem
        todo={todo}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodo}
      />
    );

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <li
          class="todoItem"
        >
          <div
            class="view"
          >
            <input
              class="toggle"
              type="checkbox"
            />
            <label>
              foo
            </label>
            <button
              class="button destroy"
            />
          </div>
        </li>
      </DocumentFragment>
    `);

    fireEvent.doubleClick(screen.getByText("foo"));

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <li
          class="todoItem"
        >
          <input
            class="edit"
            type="text"
            value="foo"
          />
        </li>
      </DocumentFragment>
    `);

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "bar" } });
    fireEvent.blur(screen.getByRole("textbox"));

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <li
          class="todoItem"
        >
          <div
            class="view"
          >
            <input
              class="toggle"
              type="checkbox"
            />
            <label>
              foo
            </label>
            <button
              class="button destroy"
            />
          </div>
        </li>
      </DocumentFragment>
    `);

    expect(editTodo).toHaveBeenCalledWith(1, "bar");
    expect(deleteTodo).not.toHaveBeenCalled();
    expect(toggleTodo).not.toHaveBeenCalled();
  });

  it("Todoを修正後エンター", () => {
    const todo: Todo = { id: 1, completed: false, text: "foo" };
    const editTodo = jest.fn();
    const deleteTodo = jest.fn();
    const toggleTodo = jest.fn();

    render(
      <TodoItem
        todo={todo}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodo}
      />
    );

    fireEvent.doubleClick(screen.getByText("foo"));
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "bar" } });
    fireEvent.keyDown(screen.getByRole("textbox"), { key: "Enter", code: 13 });

    expect(editTodo).toHaveBeenCalledWith(1, "bar");
    expect(deleteTodo).not.toHaveBeenCalled();
    expect(toggleTodo).not.toHaveBeenCalled();
  });

  it("Todoを空文字に修正して削除", () => {
    const todo: Todo = { id: 1, completed: false, text: "foo" };
    const editTodo = jest.fn();
    const deleteTodo = jest.fn();
    const toggleTodo = jest.fn();

    render(
      <TodoItem
        todo={todo}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodo}
      />
    );

    fireEvent.doubleClick(screen.getByText("foo"));
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "" } });
    fireEvent.keyDown(screen.getByRole("textbox"), { key: "Enter", code: 13 });

    expect(editTodo).not.toHaveBeenCalled();
    expect(deleteTodo).toHaveBeenCalledWith(1);
    expect(toggleTodo).not.toHaveBeenCalled();
  });

  it("Todoを削除ボタンで削除", () => {
    const todo: Todo = { id: 2, completed: false, text: "bar" };
    const editTodo = jest.fn();
    const deleteTodo = jest.fn();
    const toggleTodo = jest.fn();

    render(
      <TodoItem
        todo={todo}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodo}
      />
    );

    fireEvent.click(screen.getByRole("button"));

    expect(editTodo).not.toHaveBeenCalled();
    expect(deleteTodo).toHaveBeenCalledWith(2);
    expect(toggleTodo).not.toHaveBeenCalled();
  });

  it("Todoを切り替え", () => {
    const todo: Todo = { id: 3, completed: false, text: "baz" };
    const editTodo = jest.fn();
    const deleteTodo = jest.fn();
    const toggleTodo = jest.fn();

    render(
      <TodoItem
        todo={todo}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodo}
      />
    );

    fireEvent.click(screen.getByRole("checkbox"));

    expect(editTodo).not.toHaveBeenCalled();
    expect(deleteTodo).not.toHaveBeenCalled();
    expect(toggleTodo).toHaveBeenCalledWith(3);
  });
});
