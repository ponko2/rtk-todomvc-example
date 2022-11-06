import { action } from "@storybook/addon-actions";
import type { Meta, StoryFn } from "@storybook/react";
import { TodoButton } from "./TodoButton";

export default {
  component: TodoButton,
} as Meta<typeof TodoButton>;

const Template: StoryFn<typeof TodoButton> = () => (
  <TodoButton onClick={action("clicked")}>Hello, World!!</TodoButton>
);

export const Basic = Template.bind({});
