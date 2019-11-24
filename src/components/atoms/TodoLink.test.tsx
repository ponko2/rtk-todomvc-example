import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TodoLink } from './TodoLink';

describe('<TodoButton/>', () => {
  it('子要素を表示', () => {
    const testMessage = 'Test Message';
    const { getByText } = render(<TodoLink>{testMessage}</TodoLink>);
    expect(getByText(testMessage)).toBeInTheDocument();
  });

  it('クリックで関数を実行', () => {
    const testMessage = 'Test Message';
    const spy = jest.fn();
    const { getByText } = render(
      <TodoLink onClick={spy}>{testMessage}</TodoLink>
    );
    expect(spy).not.toHaveBeenCalled();
    fireEvent.click(getByText(testMessage));
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
