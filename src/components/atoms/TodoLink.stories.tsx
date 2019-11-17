import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { TodoLink } from './TodoLink';

export default {
  title: 'Atoms/TodoLink',
  component: TodoLink,
  decorators: [withKnobs]
};

export const simple = () => (
  <TodoLink active={boolean('Active', false)} onClick={action('clicked')}>
    Hello, World!!
  </TodoLink>
);

export const active = () => (
  <TodoLink active onClick={action('clicked')}>
    Hello, World!!
  </TodoLink>
);
