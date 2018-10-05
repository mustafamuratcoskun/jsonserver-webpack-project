const path = require('path');

module.exports = {
  entry: ["babel-polyfill",'./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'bundles'),
    filename: 'bundle.js'
  },
  mode:"production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env',"babel-preset-es2015","babel-preset-stage-0"]
          }
        }
      }
    ]
  },
  devServer: {
    port: 3200,
    index: 'index.html'
  }
};