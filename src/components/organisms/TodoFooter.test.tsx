import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TodoFooter } from './TodoFooter';
import { VisibilityFilter } from 'modules/visibilityFilter';

describe('<TodoFooter/>', () => {
  it('全てを表示', () => {
    const setFilterSpy = jest.fn();
    const clearCompletedSpy = jest.fn();
    const { getByText } = render(
      <TodoFooter
        filter={VisibilityFilter.SHOW_COMPLETED}
        setFilter={setFilterSpy}
        todosCount={2}
        completedCount={1}
        clearCompleted={clearCompletedSpy}
      />
    );

    fireEvent.click(getByText('All'));

    expect(setFilterSpy).toHaveBeenCalledWith(VisibilityFilter.SHOW_ALL);
    expect(clearCompletedSpy).not.toHaveBeenCalled();
  });

  it('未完了のものを表示', () => {
    const setFilterSpy = jest.fn();
    const clearCompletedSpy = jest.fn();
    const { getByText } = render(
      <TodoFooter
        filter={VisibilityFilter.SHOW_ALL}
        setFilter={setFilterSpy}
        todosCount={2}
        completedCount={1}
        clearCompleted={clearCompletedSpy}
      />
    );

    fireEvent.click(getByText('Active'));

    expect(setFilterSpy).toHaveBeenCalledWith(VisibilityFilter.SHOW_ACTIVE);
    expect(clearCompletedSpy).not.toHaveBeenCalled();
  });

  it('完了したものを表示', () => {
    const setFilterSpy = jest.fn();
    const clearCompletedSpy = jest.fn();
    const { getByText } = render(
      <TodoFooter
        filter={VisibilityFilter.SHOW_ALL}
        setFilter={setFilterSpy}
        todosCount={2}
        completedCount={1}
        clearCompleted={clearCompletedSpy}
      />
    );

    fireEvent.click(getByText('Completed'));

    expect(setFilterSpy).toHaveBeenCalledWith(VisibilityFilter.SHOW_COMPLETED);
    expect(clearCompletedSpy).not.toHaveBeenCalled();
  });

  it('完了したものを削除', () => {
    const setFilterSpy = jest.fn();
    const clearCompletedSpy = jest.fn();
    const { getByText } = render(
      <TodoFooter
        filter={VisibilityFilter.SHOW_ALL}
        setFilter={setFilterSpy}
        todosCount={2}
        completedCount={1}
        clearCompleted={clearCompletedSpy}
      />
    );

    fireEvent.click(getByText('Clear completed'));

    expect(setFilterSpy).not.toHaveBeenCalled();
    expect(clearCompletedSpy).toHaveBeenCalledTimes(1);
  });
});
