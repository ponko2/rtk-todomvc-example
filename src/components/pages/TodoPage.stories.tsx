import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Provider } from 'react-redux';
import { store } from 'app/store';
import { TodoPage } from './TodoPage';

export default {
  component: TodoPage,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
} as ComponentMeta<typeof TodoPage>;

const Template: ComponentStory<typeof TodoPage> = () => <TodoPage />;

export const Basic = Template.bind({});
