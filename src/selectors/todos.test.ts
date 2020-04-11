import { getVisibleTodos, getTodosCount, getCompletedTodoCount } from './todos';
import { VisibilityFilter } from 'modules/visibilityFilter';

describe('todos', () => {
  const todos = {
    todos: [
      { id: 1, completed: false, text: 'foo' },
      { id: 2, completed: true, text: 'bar' },
    ],
    isLoading: false,
    error: null,
  };

  it('getVisibleTodos', () => {
    expect(
      getVisibleTodos({
        todos,
        visibilityFilter: VisibilityFilter.SHOW_ALL,
      })
    ).toStrictEqual([
      { id: 1, completed: false, text: 'foo' },
      { id: 2, completed: true, text: 'bar' },
    ]);

    expect(
      getVisibleTodos({
        todos,
        visibilityFilter: VisibilityFilter.SHOW_ACTIVE,
      })
    ).toStrictEqual([{ id: 1, completed: false, text: 'foo' }]);

    expect(
      getVisibleTodos({
        todos,
        visibilityFilter: VisibilityFilter.SHOW_COMPLETED,
      })
    ).toStrictEqual([{ id: 2, completed: true, text: 'bar' }]);
  });

  it('getTodosCount', () => {
    expect(
      getTodosCount({
        todos,
        visibilityFilter: VisibilityFilter.SHOW_ALL,
      })
    ).toBe(2);
  });

  it('getCompletedTodoCount', () => {
    expect(
      getCompletedTodoCount({
        todos,
        visibilityFilter: VisibilityFilter.SHOW_ALL,
      })
    ).toBe(1);
  });
});
