const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin(['NODE_ENV', 'FEATURES'])
  ],
  module: {
    rules: [{
      test: /\.js$/,
      use: ['react-hot-loader', 'babel-loader'],
      include: path.join(__dirname, 'src'),
    }]
  }
};

// new webpack.optimize.UglifyJsPlugin({ sourceMap: true })
