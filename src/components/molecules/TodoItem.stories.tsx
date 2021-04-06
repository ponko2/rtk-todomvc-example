import React, { ReactNode } from 'react';
import { StoryFn } from '@storybook/addons';
import { action } from '@storybook/addon-actions';
import { Todo } from 'api/todos';
import { TodoItem } from './TodoItem';

const withContainer = (storyFn: StoryFn<ReactNode>) => (
  <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>{storyFn()}</ul>
);

export default {
  title: 'Molecules/TodoItem',
  component: TodoItem,
  decorators: [withContainer],
};

export const Basic = ({ todo }: { todo: Todo }) => (
  <TodoItem
    todo={todo}
    editTodo={action('editTodo')}
    deleteTodo={action('deleteTodo')}
    toggleTodo={action('toggleTodo')}
  />
);

Basic.args = {
  todo: {
    id: 1,
    completed: false,
    text: 'Hello, World!!',
  },
};

export const Completed = ({ todo }: { todo: Todo }) => (
  <TodoItem
    todo={todo}
    editTodo={action('editTodo')}
    deleteTodo={action('deleteTodo')}
    toggleTodo={action('toggleTodo')}
  />
);

Completed.args = {
  todo: {
    id: 1,
    completed: true,
    text: 'Hello, World!!',
  },
};
