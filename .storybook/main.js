module.exports = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-links",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  features: {
    storyStoreV7: !global.navigator?.userAgent?.match?.("jsdom"),
  },
  docs: {
    autodocs: true,
  },
};
