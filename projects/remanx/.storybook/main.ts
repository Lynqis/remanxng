import type { StorybookConfig } from "@storybook/angular";
import { join, dirname } from "path";
import remarkGfm from 'remark-gfm';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
  stories: [
    "../components/*.@(mdx|stories.@(ts))",
    "../components/**/*.@(mdx|stories.@(js|jsx|mjs|ts|tsx))"
  ],
  addons: [
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@chromatic-com/storybook"),
    {
      name: '@storybook/addon-essentials',
      options: {
        docs: true
      },
    },
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      }
    }
  ],
  framework: {
    name: getAbsolutePath("@storybook/angular"),
    options: {
      enableNgStandalone: true,
    },
  },
  docs: {
    defaultName: 'Documentation'
  },
  core: {
    disableTelemetry: true,
  },
  staticDirs: ['../assets'],
  webpackFinal: async (config) => {
    config.module?.rules?.push({
      test: /\.json$/,
      type: 'json',
      use: [],
      resolve: {
        fullySpecified: false,
      },
    });

    return config;
  },
};
export default config;
