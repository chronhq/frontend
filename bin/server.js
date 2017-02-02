const path = require('path');
const webpack = require('webpack');
const express = require('express');
const config = require('../webpack.config');
const httpProxy = require('http-proxy');

const app = express();
const compiler = webpack(config);
const targetUrl = `http://${process.env.HOST}:${process.env.APIPORT}`;

const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  ws: true
});

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/static', express.static('public'));
// Proxy to API server
app.use('/api', (req, res) => {
  proxy.web(req, res, {target: targetUrl});
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});


app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.error(err);
  }

  return console.info('==> 💻  Open http://%s:%s in a browser to view the app.', process.env.HOST, process.env.PORT);
});
