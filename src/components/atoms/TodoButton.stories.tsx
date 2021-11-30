import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { TodoButton } from './TodoButton';

export default {
  component: TodoButton,
} as ComponentMeta<typeof TodoButton>;

const Template: ComponentStory<typeof TodoButton> = () => (
  <TodoButton onClick={action('clicked')}>Hello, World!!</TodoButton>
);

export const Basic = Template.bind({});
