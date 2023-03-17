const webpack = require('webpack')

module.exports = function (context, options) {
  return {
    name: 'redoc-compatibility-plugin',
    configureWebpack(config, isServer, utils) {
      return {
        plugins: [
          new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
          }),
        ],
      }
    },
  }
}
