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
    new webpack.EnvironmentPlugin(['NODE_ENV', 'APIPORT', 'FEATURES'])
  ],
  module: {
    rules: [{
      test: /\.js$/,
      use: ['react-hot-loader', 'babel-loader'],
      include: path.join(__dirname, 'src'),
    },
    {
      test: /\.less$/,
      use: ['style-loader', 
      { loader: 'css-loader', options: { importLoaders: 1 } },
      'less-loader']
    },
    {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=applfont-woff"
    }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=applfont-woff"
    }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=apploctet-stream"
    }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader"
    }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml"
    },
    ]
  }
};

// new webpack.optimize.UglifyJsPlugin({ sourceMap: true })
