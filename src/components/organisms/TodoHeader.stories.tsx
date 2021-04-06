import React from 'react';
import { action } from '@storybook/addon-actions';
import { TodoHeader } from './TodoHeader';

export default {
  title: 'Organisms/TodoHeader',
  component: TodoHeader,
};

export const Basic = ({
  todosCount,
  completedCount,
}: {
  todosCount: number;
  completedCount: number;
}) => (
  <TodoHeader
    todosCount={todosCount}
    completedCount={completedCount}
    addTodo={action('addTodo')}
    toggleAllTodo={action('toggleAllTodo')}
  />
);

Basic.args = {
  todosCount: 0,
  completedCount: 0,
};

export const HasActive = ({
  todosCount,
  completedCount,
}: {
  todosCount: number;
  completedCount: number;
}) => (
  <TodoHeader
    todosCount={todosCount}
    completedCount={completedCount}
    addTodo={action('addTodo')}
    toggleAllTodo={action('toggleAllTodo')}
  />
);

HasActive.args = {
  todosCount: 1,
  completedCount: 0,
};

export const IsAllCompleted = ({
  todosCount,
  completedCount,
}: {
  todosCount: number;
  completedCount: number;
}) => (
  <TodoHeader
    todosCount={todosCount}
    completedCount={completedCount}
    addTodo={action('addTodo')}
    toggleAllTodo={action('toggleAllTodo')}
  />
);

IsAllCompleted.args = {
  todosCount: 1,
  completedCount: 1,
};
