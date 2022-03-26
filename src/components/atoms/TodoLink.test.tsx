import { fireEvent, render, screen } from "@testing-library/react";
import { TodoLink } from "./TodoLink";

describe("<TodoButton/>", () => {
  it("子要素を表示", () => {
    const testMessage = "Test Message";
    render(<TodoLink>{testMessage}</TodoLink>);
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });

  it("クリックで関数を実行", () => {
    const testMessage = "Test Message";
    const spy = jest.fn();
    render(<TodoLink onClick={spy}>{testMessage}</TodoLink>);
    expect(spy).not.toHaveBeenCalled();
    fireEvent.click(screen.getByText(testMessage));
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
