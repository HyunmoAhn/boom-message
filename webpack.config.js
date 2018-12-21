const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      }
    ]
  },
  devServer: {
    contentBase: 'build',
    disableHostCheck: true, // do not use production mode
    historyApiFallback: true,
    hot: true,
    host: '0.0.0.0',
    port: 4000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      inject: 'body',
    }),
  ]
};
