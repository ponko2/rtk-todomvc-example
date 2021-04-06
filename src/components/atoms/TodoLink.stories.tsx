import React from 'react';
import { action } from '@storybook/addon-actions';
import { TodoLink } from './TodoLink';

export default {
  title: 'Atoms/TodoLink',
  component: TodoLink,
};

export const Basic = ({ active }: { active: boolean }) => (
  <TodoLink active={active} onClick={action('clicked')}>
    Hello, World!!
  </TodoLink>
);

Basic.args = {
  active: false,
};

export const Active = ({ active }: { active: boolean }) => (
  <TodoLink active={active} onClick={action('clicked')}>
    Hello, World!!
  </TodoLink>
);

Active.args = {
  active: true,
};
