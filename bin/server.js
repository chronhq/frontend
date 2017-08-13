const path = require('path');
const webpack = require('webpack');
const express = require('express');
const proxy = require('express-http-proxy');
const config = require('../webpack.config');
const url = require('url');

const app = express();
const compiler = webpack(config);
const targetUrl = `http://api:${process.env.APIPORT}/`;
const siteBackend = 'https://chronist.ru/';

app.use('/api', proxy(targetUrl, {
  forwardPath: (req, res) => url.parse(req.originalUrl).path
}));
app.use('/shared', proxy(siteBackend));

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/img/favicon.ico'));
});

app.get('/richpreview.jpg', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/img/richpreview.jpg'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});


app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.error(err);
  }

  return console.info(
    '==> 💻  Open http://%s:%s in a browser to view the app.',
    process.env.HOST, process.env.PORT
    );
});
