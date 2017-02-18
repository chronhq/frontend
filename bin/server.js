const path = require('path');
const webpack = require('webpack');
const express = require('express');
const config = require('../webpack.config');

const app = express();
const compiler = webpack(config);
const targetUrl = `http://${process.env.HOST}:${process.env.APIPORT}`;

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/static', express.static('public'));

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
