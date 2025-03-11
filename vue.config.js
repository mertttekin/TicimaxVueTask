const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  configureWebpack: {
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json']
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          options: { appendTsSuffixTo: [/\.vue$/] },
          exclude: /node_modules/
        }
      ]
    }
  },
  transpileDependencies: true
})
