import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { TodoHeader } from './TodoHeader';

export default {
  title: 'Organisms/TodoHeader',
  component: TodoHeader,
  decorators: [withKnobs]
};

export const simple = () => (
  <TodoHeader
    todosCount={number('Todos Count', 0)}
    completedCount={number('Completed Count', 0)}
    addTodo={action('addTodo')}
    toggleAllTodo={action('toggleAllTodo')}
  />
);

export const hasActive = () => (
  <TodoHeader
    todosCount={1}
    completedCount={0}
    addTodo={action('addTodo')}
    toggleAllTodo={action('toggleAllTodo')}
  />
);

export const isAllCompleted = () => (
  <TodoHeader
    todosCount={1}
    completedCount={1}
    addTodo={action('addTodo')}
    toggleAllTodo={action('toggleAllTodo')}
  />
);
