import { fireEvent, render, screen } from "@testing-library/react";
import { TodoHeader } from "./TodoHeader";

describe("<TodoHeader/>", () => {
  it("Todoを追加", () => {
    const addSpy = jest.fn();
    const toggleAllSpy = jest.fn();

    render(
      <TodoHeader
        todosCount={0}
        completedCount={0}
        addTodo={addSpy}
        toggleAllTodo={toggleAllSpy}
      />,
    );

    const textbox = screen.getByRole("textbox");
    fireEvent.change(textbox, { target: { value: "foo" } });

    expect(textbox).toHaveValue("foo");

    fireEvent.keyDown(textbox, { key: "Enter", code: 13 });

    expect(textbox).toHaveValue("");
    expect(addSpy).toHaveBeenCalledWith("foo");
    expect(toggleAllSpy).not.toHaveBeenCalled();
  });

  it("全てのTodoを切り替え", () => {
    const addSpy = jest.fn();
    const toggleAllSpy = jest.fn();
    const { container } = render(
      <TodoHeader
        todosCount={1}
        completedCount={1}
        addTodo={addSpy}
        toggleAllTodo={toggleAllSpy}
      />,
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const label = container.querySelector("label");

    // eslint-disable-next-line jest/no-conditional-in-test
    if (label) {
      fireEvent.click(label);
    }

    expect(addSpy).not.toHaveBeenCalled();
    expect(toggleAllSpy).toHaveBeenCalledTimes(1);
  });
});
