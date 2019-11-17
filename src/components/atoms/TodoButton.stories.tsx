import React from 'react';
import { action } from '@storybook/addon-actions';
import { TodoButton } from './TodoButton';

export default {
  title: 'Atoms/TodoButton',
  component: TodoButton
};

export const simple = () => (
  <TodoButton onClick={action('clicked')}>Hello, World!!</TodoButton>
);
