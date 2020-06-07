// require('dotenv').config();
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const config = {
  experimental: {
    modern: true,
  },
  env: {
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
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

    return config;
  },
};

module.exports = config;
