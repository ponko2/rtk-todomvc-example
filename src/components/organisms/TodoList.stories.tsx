import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { TodoList } from "./TodoList";

const meta = {
  component: TodoList,
} satisfies Meta<typeof TodoList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    deleteTodo: action("deleteTodo"),
    editTodo: action("editTodo"),
    toggleTodo: action("toggleTodo"),
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
  },
} satisfies Story;
