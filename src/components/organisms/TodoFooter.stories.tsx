import { action } from "@storybook/addon-actions";
import type { Meta, StoryFn } from "@storybook/react";
import {
  createMemoryHistory,
  ReactLocation,
  Router,
} from "@tanstack/react-location";
import { TodoFooter } from "./TodoFooter";

const location = new ReactLocation({
  history: createMemoryHistory({
    initialEntries: ["/"],
  }),
});

export default {
  component: TodoFooter,
  decorators: [
    (Story) => (
      <Router location={location} routes={[]}>
        <Story />
      </Router>
    ),
  ],
} as Meta<typeof TodoFooter>;

const Template: StoryFn<typeof TodoFooter> = (args) => (
  <TodoFooter {...args} clearCompleted={action("clearCompleted")} />
);

export const Basic = Template.bind({});

Basic.args = {
  todosCount: 1,
  completedCount: 1,
};

export const HasCompleted = Template.bind({});

HasCompleted.args = {
  todosCount: 2,
  completedCount: 1,
};
