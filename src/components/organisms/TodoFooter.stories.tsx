import { action } from "@storybook/addon-actions";
import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { VisibilityFilter } from "../../modules/visibilityFilter";
import { TodoFooter } from "./TodoFooter";

export default {
  component: TodoFooter,
} as ComponentMeta<typeof TodoFooter>;

const Template: ComponentStory<typeof TodoFooter> = (args) => (
  <TodoFooter
    {...args}
    setFilter={action("setFilter")}
    clearCompleted={action("clearCompleted")}
  />
);

export const Basic = Template.bind({});

Basic.args = {
  filter: VisibilityFilter.SHOW_ALL,
  todosCount: 1,
  completedCount: 1,
};

export const HasCompleted = Template.bind({});

HasCompleted.args = {
  filter: VisibilityFilter.SHOW_COMPLETED,
  todosCount: 2,
  completedCount: 1,
};
