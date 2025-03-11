const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  configureWebpack: (config) => {
    config.plugins = [
      ...config.plugins,
      new (require('webpack').DefinePlugin)({
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(false),
      }),
    ];
    config.resolve.extensions.push('.ts', '.js', '.vue', '.json');
    config.module.rules.push({
      test: /\.ts$/,
      loader: 'ts-loader',
      options: {
        appendTsSuffixTo: [/\.vue$/],
        transpileOnly: true,
      },
      exclude: /node_modules/,
    });
  },
  transpileDependencies: true,
  parallel: false,
});
