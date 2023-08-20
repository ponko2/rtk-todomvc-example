import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { TodoButton } from "./TodoButton";

describe("<TodoButton/>", () => {
  it("子要素を表示", () => {
    const testMessage = "Test Message";
    render(<TodoButton>{testMessage}</TodoButton>);
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });

  it("クリックで関数を実行", () => {
    const testMessage = "Test Message";
    const spy = jest.fn();
    render(<TodoButton onClick={spy}>{testMessage}</TodoButton>);
    expect(spy).not.toHaveBeenCalled();
    fireEvent.click(screen.getByText(testMessage));
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
