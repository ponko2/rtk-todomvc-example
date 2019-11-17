import React, { ReactNode } from 'react';
import { StoryFn } from '@storybook/addons';
import { Provider } from 'react-redux';
import { store } from 'app/store';
import { TodoPage } from './TodoPage';

const withProvider = (storyFn: StoryFn<ReactNode>) => (
  <Provider store={store}>{storyFn()}</Provider>
);

export default {
  title: 'Pages/TodoList',
  component: TodoPage,
  decorators: [withProvider]
};

export const simple = () => <TodoPage />;
