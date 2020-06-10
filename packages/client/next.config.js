const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const withTM = require('next-transpile-modules')(['@graphql-demo/core']);

const config = {
  experimental: {
    modern: true,
  },
  pageExtensions: ['tsx'],
  webpack(config = {}, options) {
    if (!config.resolve) {
      config.resolve = {};
    }

    const tsPathsPlugin = new TSConfigPathsPlugin();
    if (config.resolve.plugins) {
      config.resolve.plugins.push(tsPathsPlugin);
    } else {
      config.resolve.plugins = [tsPathsPlugin];
    }

    config.node = {
      fs: 'empty',
    };

    config.module.rules.forEach((rule) => {
      const ruleContainsTs = rule.test && rule.test.toString().includes('ts|tsx');

      if (ruleContainsTs && rule.use && rule.use.loader === 'next-babel-loader') {
        rule.include = undefined;
      }
    });

    return config;
  },
};

module.exports = withTM(config);
