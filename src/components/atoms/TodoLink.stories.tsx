import { action } from "@storybook/addon-actions";
import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { TodoLink } from "./TodoLink";

export default {
  component: TodoLink,
} as ComponentMeta<typeof TodoLink>;

const Template: ComponentStory<typeof TodoLink> = (args) => (
  <TodoLink {...args} onClick={action("clicked")}>
    Hello, World!!
  </TodoLink>
);

export const Basic = Template.bind({});

Basic.args = {
  active: false,
};

export const Active = Template.bind({});

Active.args = {
  active: true,
};
