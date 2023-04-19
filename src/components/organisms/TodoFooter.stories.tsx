import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import {
  RootRoute,
  Route,
  Router,
  RouterProvider,
  createMemoryHistory,
} from "@tanstack/router";
import { TodoFooter } from "./TodoFooter";

const history = createMemoryHistory({ initialEntries: ["/"] });

const meta = {
  component: TodoFooter,
  decorators: [
    (Story) => {
      const rootRoute = new RootRoute({ component: () => <Story /> });
      const routeTree = rootRoute.addChildren([
        new Route({ getParentRoute: () => rootRoute, path: "/" }),
        new Route({ getParentRoute: () => rootRoute, path: "/active" }),
        new Route({ getParentRoute: () => rootRoute, path: "/completed" }),
      ]);
      const router = new Router({ routeTree, history });
      return <RouterProvider router={router} />;
    },
  ],
} satisfies Meta<typeof TodoFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    clearCompleted: action("clearCompleted"),
    todosCount: 1,
    completedCount: 1,
  },
} satisfies Story;

export const HasCompleted = {
  args: {
    ...Basic.args,
    todosCount: 2,
    completedCount: 1,
  },
} satisfies Story;
