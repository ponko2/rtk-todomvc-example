import { action } from "@storybook/addon-actions";
import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { TodoList } from "./TodoList";

export default {
  component: TodoList,
} as ComponentMeta<typeof TodoList>;

const Template: ComponentStory<typeof TodoList> = (args) => (
  <TodoList
    {...args}
    deleteTodo={action("deleteTodo")}
    editTodo={action("editTodo")}
    toggleTodo={action("toggleTodo")}
  />
);

export const Basic = Template.bind({});

Basic.args = {
  todos: [
    {
      id: 1,
      title: "foo",
      completed: false,
    },
    {
      id: 2,
      title: "bar",
      completed: true,
    },
    {
      id: 3,
      title: "baz",
      completed: false,
    },
  ],
};
