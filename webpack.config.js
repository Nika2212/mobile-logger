const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: 'development',
  entry: '/src/index.ts',
  output: {
    filename: 'mobile-logger.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: 'index.html'
    })
  ]
};

module.exports = config;
