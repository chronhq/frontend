const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'eval',
  entry: {
    client: path.resolve(__dirname, 'src'),
    vendor: ['react', 'react-dom'],
  },
  output: {
    filename: '[name].bundle-[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 200000,
  },
  optimization: {
    noEmitOnErrors: true,
    nodeEnv: 'production'
  },
  stats: {
    assets: true,
    colors: true,
    errors: true,
    errorDetails: true,
    hash: false
  },
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        WEBPACK: true
      }
    }),
    new FaviconsWebpackPlugin({
      logo: './src/img/favicon.png',
      prefix: 'icons-[hash]/',
      emitStats: true,
      persisentCache: true,
      background: '#000',
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: 'style.bundle-[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body',
      filename: 'index.html'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: 'babel-loader',
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['url-loader?limit=4096&name=[name].[ext]']
      },
      {
        test: /\.ico$/,
        use: ['file-loader?name=[name].[ext]']
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'url-loader?limit=100000&name=[name].[ext]'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.(mp4|m4v)$/,
        loader: 'file-loader'
      },
      {
        test: /\.md$/,
        loader: 'markdown-with-front-matter-loader'
      },
    ]
  },
};
