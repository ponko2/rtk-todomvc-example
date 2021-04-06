import React from 'react';
import { action } from '@storybook/addon-actions';
import { VisibilityFilter } from 'modules/visibilityFilter';
import { TodoFooter } from './TodoFooter';

export default {
  title: 'Organisms/TodoFooter',
  component: TodoFooter,
};

export const Basic = ({
  filter,
  todosCount,
  completedCount,
}: {
  filter: VisibilityFilter;
  todosCount: number;
  completedCount: number;
}) => (
  <TodoFooter
    filter={filter}
    setFilter={action('setFilter')}
    todosCount={todosCount}
    completedCount={completedCount}
    clearCompleted={action('clearCompleted')}
  />
);

Basic.args = {
  filter: VisibilityFilter.SHOW_ALL,
  todosCount: 1,
  completedCount: 1,
};

export const HasCompleted = ({
  filter,
  todosCount,
  completedCount,
}: {
  filter: VisibilityFilter;
  todosCount: number;
  completedCount: number;
}) => (
  <TodoFooter
    filter={filter}
    setFilter={action('setFilter')}
    todosCount={todosCount}
    completedCount={completedCount}
    clearCompleted={action('clearCompleted')}
  />
);

HasCompleted.args = {
  filter: VisibilityFilter.SHOW_COMPLETED,
  todosCount: 2,
  completedCount: 1,
};
