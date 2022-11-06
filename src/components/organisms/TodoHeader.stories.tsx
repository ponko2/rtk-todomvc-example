import { action } from "@storybook/addon-actions";
import type { Meta, StoryFn } from "@storybook/react";
import { TodoHeader } from "./TodoHeader";

export default {
  component: TodoHeader,
} as Meta<typeof TodoHeader>;

const Template: StoryFn<typeof TodoHeader> = (args) => (
  <TodoHeader
    {...args}
    addTodo={action("addTodo")}
    toggleAllTodo={action("toggleAllTodo")}
  />
);

export const Basic = Template.bind({});

Basic.args = {
  todosCount: 0,
  completedCount: 0,
};

export const HasActive = Template.bind({});

HasActive.args = {
  todosCount: 1,
  completedCount: 0,
};

export const IsAllCompleted = Template.bind({});

IsAllCompleted.args = {
  todosCount: 1,
  completedCount: 1,
};
