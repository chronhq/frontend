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

const mode = 'development';

const getEnv = (env, param) => (env[param] === undefined ? process.env[param] : env[param]);

module.exports = (env = {}) => ({
  mode,
  devtool: 'source-map',
  entry: {
    main: path.resolve(__dirname, 'src/index.js'),
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
    historyApiFallback: true,
    port: 3000,
    compress: true,
    https: false,
    static: path.resolve('static'),
    proxy: getEnv(env, 'EXT')
      ? [{
        context: ['/api', '/mvt', 'status/mvt'],
        target: 'https://chronmaps.com/',
        changeOrigin: true,
      }]
      : {
        '/api': 'http://api:8086/',
        '/mvt': getEnv(env, 'PGMVT')
          ? { target: 'http://api:8086/api/' }
          : {
            target: 'http://localhost:5000',
            pathRewrite: { '^/mvt': '' }
          },
        '/status/mvt': {
          target: 'http://localhost:5001',
          pathRewrite: { '^/status/mvt': '' }
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
    new HtmlWebpackPlugin({
      title: 'Chron Development',
      filename: 'index.html',
      template: './index.en.html'
    }),
  ]
});
