import { action } from "@storybook/addon-actions";
import type { ComponentMeta, ComponentStory } from "@storybook/react";
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
} as ComponentMeta<typeof TodoFooter>;

const Template: ComponentStory<typeof TodoFooter> = (args) => (
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
