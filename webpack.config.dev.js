/*
 * Chron.
 * Copyright (c) 2018 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
 * Daniil Mordasov, Liam O’Flynn, Mikhail Orlov.
 * -----
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * -----
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * -----
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const mode = 'development';

module.exports = (env = {}) => ({
  mode,
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
    nodeEnv: mode,
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
    contentBase: path.resolve('static'),
    publicPath: '/',
    proxy: env.EXT
      ? [{
        context: ['/api', '/mvt'],
        target: 'https://chronmaps.com/',
        changeOrigin: true,
      }]
      : {
        '/api': 'http://api:3080/',
        '/mvt': {
          target: 'http://localhost:5000',
          pathRewrite: { '^/mvt': '' }
        }
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
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'less-loader', options: { sourceMap: true } }
        ]
      },
      {
        test: /\.css/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { sourceMap: true } }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
            },
          },
        ],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      }
    ]
  },
  plugins:
  [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(mode),
    }),
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
});
