import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { TodoList } from './TodoList';

export default {
  component: TodoList,
} as ComponentMeta<typeof TodoList>;

const Template: ComponentStory<typeof TodoList> = (args) => (
  <TodoList
    {...args}
    deleteTodo={action('deleteTodo')}
    editTodo={action('editTodo')}
    toggleTodo={action('toggleTodo')}
  />
);

export const Basic = Template.bind({});

Basic.args = {
  todos: [
    {
      id: 1,
      completed: false,
      text: 'foo',
    },
    {
      id: 2,
      completed: true,
      text: 'bar',
    },
    {
      id: 3,
      completed: false,
      text: 'baz',
    },
  ],
};
