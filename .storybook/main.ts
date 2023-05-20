// .storybook/main.js or .storybook/preview.js

import type { StorybookConfig } from "@storybook/react-webpack5";
import type { Configuration as WebpackConfiguration } from "webpack";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-interactions",
    "storybook-css-modules",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["..\\public"],

  webpackFinal: async (webpackConfig: WebpackConfiguration) => {
    if (webpackConfig.resolve && webpackConfig.resolve.alias) {
      webpackConfig.resolve.alias["@src"] = path.resolve(__dirname, "../src/");
    }
    return webpackConfig;
  },
};

export default config;
