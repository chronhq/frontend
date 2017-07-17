const path = require('path');
const webpack = require('webpack');

const isProd = () => process.env.NODE_ENV === 'production';
const devtool = isProd()
  ? 'cheap-module-source-map'
  : 'source-map';

// const devtool = isProd()
//   ? 'eval'
//   : 'source-map';


const productionPlugins = isProd()
  ? [new webpack.optimize.UglifyJsPlugin({ sourceMap: devtool })]
  : [];

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
    new webpack.EnvironmentPlugin(['NODE_ENV', 'APIPORT']),
    ...productionPlugins
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['react-hot-loader', 'babel-loader'],
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'shared')],
      },
      {
        test: /\.(html|ico)$/,
        use: ['file-loader?name=[name].[ext]']
      },
      {
        test: /\.less$/,
        use: ['style-loader',
        { loader: 'css-loader', options: { importLoaders: 1 } }, 'less-loader']
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=applfont-woff'
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=applfont-woff'
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=apploctet-stream'
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['url-loader?limit=4096&name=[name].[ext]']
      },
    ]
  }
};
