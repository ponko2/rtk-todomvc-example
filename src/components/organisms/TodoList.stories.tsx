import React from 'react';
import { action } from '@storybook/addon-actions';
import { Todo } from 'api/todos';
import { TodoList } from './TodoList';

export default {
  title: 'Organisms/TodoList',
  component: TodoList,
};

export const Basic = ({ todos }: { todos: Todo[] }) => (
  <TodoList
    todos={todos}
    deleteTodo={action('deleteTodo')}
    editTodo={action('editTodo')}
    toggleTodo={action('toggleTodo')}
  />
);

Basic.args = {
  todos: [
    {
      id: 1,
      completed: false,
      text: 'foo',
    },
    {
      id: 2,
      completed: true,
      text: 'bar',
    },
    {
      id: 3,
      completed: false,
      text: 'baz',
    },
  ],
};
