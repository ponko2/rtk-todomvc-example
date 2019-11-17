import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, number, select } from '@storybook/addon-knobs';
import { VisibilityFilter } from 'constants/VisibilityFilter';
import { TodoFooter } from './TodoFooter';

export default {
  title: 'Organisms/TodoFooter',
  component: TodoFooter,
  decorators: [withKnobs]
};

export const simple = () => (
  <TodoFooter
    filter={select(
      'Filter',
      {
        All: VisibilityFilter.SHOW_ALL,
        Active: VisibilityFilter.SHOW_ACTIVE,
        Completed: VisibilityFilter.SHOW_COMPLETED
      },
      VisibilityFilter.SHOW_ALL
    )}
    setFilter={action('setFilter')}
    todosCount={number('Todos Count', 1)}
    completedCount={number('Completed Count', 1)}
    clearCompleted={action('clearCompleted')}
  />
);

export const hasActive = () => (
  <TodoFooter
    filter={VisibilityFilter.SHOW_ACTIVE}
    setFilter={action('setFilter')}
    todosCount={1}
    completedCount={0}
    clearCompleted={action('clearCompleted')}
  />
);

export const hasCompleted = () => (
  <TodoFooter
    filter={VisibilityFilter.SHOW_COMPLETED}
    setFilter={action('setFilter')}
    todosCount={2}
    completedCount={1}
    clearCompleted={action('clearCompleted')}
  />
);
