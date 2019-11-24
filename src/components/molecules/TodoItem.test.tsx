import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TodoItem } from './TodoItem';
import { Todo } from 'api/todos';

describe('<TodoItem/>', () => {
  it('Todoを修正後フォーカスアウト', () => {
    const todo: Todo = { id: 1, completed: false, text: 'foo' };
    const editTodo = jest.fn();
    const deleteTodo = jest.fn();
    const toggleTodo = jest.fn();
    const { getByText, getByRole, asFragment } = render(
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

    fireEvent.doubleClick(getByText('foo'));

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

    fireEvent.change(getByRole('textbox'), { target: { value: 'bar' } });
    fireEvent.blur(getByRole('textbox'));

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

    expect(editTodo).toHaveBeenCalledWith(1, 'bar');
    expect(deleteTodo).not.toHaveBeenCalled();
    expect(toggleTodo).not.toHaveBeenCalled();
  });

  it('Todoを修正後エンター', () => {
    const todo: Todo = { id: 1, completed: false, text: 'foo' };
    const editTodo = jest.fn();
    const deleteTodo = jest.fn();
    const toggleTodo = jest.fn();
    const { getByText, getByRole } = render(
      <TodoItem
        todo={todo}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodo}
      />
    );

    fireEvent.doubleClick(getByText('foo'));
    fireEvent.change(getByRole('textbox'), { target: { value: 'bar' } });
    fireEvent.keyDown(getByRole('textbox'), { key: 'Enter', code: 13 });

    expect(editTodo).toHaveBeenCalledWith(1, 'bar');
    expect(deleteTodo).not.toHaveBeenCalled();
    expect(toggleTodo).not.toHaveBeenCalled();
  });

  it('Todoを空文字に修正して削除', () => {
    const todo: Todo = { id: 1, completed: false, text: 'foo' };
    const editTodo = jest.fn();
    const deleteTodo = jest.fn();
    const toggleTodo = jest.fn();
    const { getByText, getByRole } = render(
      <TodoItem
        todo={todo}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodo}
      />
    );

    fireEvent.doubleClick(getByText('foo'));
    fireEvent.change(getByRole('textbox'), { target: { value: '' } });
    fireEvent.keyDown(getByRole('textbox'), { key: 'Enter', code: 13 });

    expect(editTodo).not.toHaveBeenCalled();
    expect(deleteTodo).toHaveBeenCalledWith(1);
    expect(toggleTodo).not.toHaveBeenCalled();
  });

  it('Todoを削除ボタンで削除', () => {
    const todo: Todo = { id: 2, completed: false, text: 'bar' };
    const editTodo = jest.fn();
    const deleteTodo = jest.fn();
    const toggleTodo = jest.fn();
    const { getByRole } = render(
      <TodoItem
        todo={todo}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodo}
      />
    );

    fireEvent.click(getByRole('button'));

    expect(editTodo).not.toHaveBeenCalled();
    expect(deleteTodo).toHaveBeenCalledWith(2);
    expect(toggleTodo).not.toHaveBeenCalled();
  });

  it('Todoを切り替え', () => {
    const todo: Todo = { id: 3, completed: false, text: 'baz' };
    const editTodo = jest.fn();
    const deleteTodo = jest.fn();
    const toggleTodo = jest.fn();
    const { getByRole } = render(
      <TodoItem
        todo={todo}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodo}
      />
    );

    fireEvent.click(getByRole('checkbox'));

    expect(editTodo).not.toHaveBeenCalled();
    expect(deleteTodo).not.toHaveBeenCalled();
    expect(toggleTodo).toHaveBeenCalledWith(3);
  });
});
