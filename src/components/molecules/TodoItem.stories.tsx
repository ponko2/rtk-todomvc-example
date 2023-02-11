import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { TodoItem } from "./TodoItem";

const meta = {
  component: TodoItem,
  decorators: [
    (Story) => (
      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof TodoItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    editTodo: action("editTodo"),
    deleteTodo: action("deleteTodo"),
    toggleTodo: action("toggleTodo"),
    todo: {
      id: 1,
      title: "Hello, World!!",
      completed: false,
    },
  },
} satisfies Story;

export const Completed = {
  args: {
    ...Basic.args,
    todo: {
      id: 1,
      title: "Hello, World!!",
      completed: true,
    },
  },
} satisfies Story;
