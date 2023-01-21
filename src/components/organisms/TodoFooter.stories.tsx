import { action } from "@storybook/addon-actions";
import type { Meta, StoryFn } from "@storybook/react";
import {
  createMemoryHistory,
  createRouteConfig,
  ReactRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { TodoFooter } from "./TodoFooter";

const history = createMemoryHistory({ initialEntries: ["/"] });

export default {
  component: TodoFooter,
  decorators: [
    (Story) => {
      const rootRoute = createRouteConfig({ component: () => <Story /> });
      const routeConfig = rootRoute.addChildren([
        rootRoute.createRoute({ path: "/" }),
        rootRoute.createRoute({ path: "/active" }),
        rootRoute.createRoute({ path: "/completed" }),
      ]);
      const router = new ReactRouter({ routeConfig, history });
      return <RouterProvider router={router} />;
    },
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
