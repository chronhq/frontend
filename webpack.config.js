const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const isProd = () => process.env.NODE_ENV === 'production';
const devtool = isProd()
  ? 'cheap-module-source-map'
  : 'source-map';

const uglify = {
  beautify: false,
  comments: false,
  mangle: true,
  sourceMap: devtool,
  compress: {
    sequences: true,
    booleans: true,
    loops: true,
    unused: true,
    warnings: false,
    drop_console: true,
    unsafe: true
  }
};

const envPlugins = isProd()
  ? [new webpack.optimize.UglifyJsPlugin(uglify)]
  : [new BundleAnalyzerPlugin({ analyzerHost: '0.0.0.0', analyzerPort: '3001' })];

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
    ...envPlugins
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['react-hot-loader/webpack', 'babel-loader'],
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'shared')],
      },
      {
        test: /\.(html|ico)$/,
        use: ['file-loader?name=[name].[ext]']
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'less-loader' }
        ]
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
