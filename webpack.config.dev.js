const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    main: path.resolve(__dirname, 'src'),
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    modules: [
      path.resolve('./'),
      path.resolve('./node_modules'),
    ]
  },
  optimization: {
    nodeEnv: 'development'
  },
  devServer: {
    host: '0.0.0.0',
    public: '0.0.0.0:3000',
    historyApiFallback: true,
    inline: true,
    port: 3000,
    hot: true,
    hotOnly: true,
    compress: true,
    https: false,
    disableHostCheck: true,
    proxy: {
      '/api': 'http://api:3333/',
      '/mvt': 'http://api:3333/',
      '/shared': 'http://api:3333/',
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: {
          loader: 'babel-loader'
        },
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'url-loader?limit=4096&name=[name].[ext]'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&name=[name].[ext]'
      }
    ]
  },
  plugins:
  [
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin({
      analyzerPort: '3001',
      openAnalyzer: false,
    }),
    new HtmlWebpackPlugin({
      title: 'Chron Development',
      filename: 'index.html',
      template: './index.en.html'
    }),
  ]
};
