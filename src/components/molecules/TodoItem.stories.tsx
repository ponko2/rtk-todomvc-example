import React, { ReactNode } from 'react';
import { StoryFn } from '@storybook/addons';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { TodoItem } from './TodoItem';

const withContainer = (storyFn: StoryFn<ReactNode>) => (
  <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>{storyFn()}</ul>
);

export default {
  title: 'Molecules/TodoItem',
  component: TodoItem,
  decorators: [withKnobs, withContainer],
};

export const simple = () => (
  <TodoItem
    todo={{
      id: 1,
      completed: boolean('Completed', false),
      text: text('Text', 'Hello, World!!'),
    }}
    editTodo={action('editTodo')}
    deleteTodo={action('deleteTodo')}
    toggleTodo={action('toggleTodo')}
  />
);

export const completed = () => (
  <TodoItem
    todo={{
      id: 1,
      completed: true,
      text: text('Text', 'Hello, World!!'),
    }}
    editTodo={action('editTodo')}
    deleteTodo={action('deleteTodo')}
    toggleTodo={action('toggleTodo')}
  />
);
