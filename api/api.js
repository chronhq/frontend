import express from 'express';
import bodyParser from 'body-parser';

import { logger } from '../shared';
import actions from './actions';

const app = express();

function parseParams(url) {
  const [path, params] = url.split('?');
  const urlPath = path.split('/').slice(1);
  const urlKey = urlPath.shift().toLowerCase();
  const urlParams = typeof params === 'undefined'
    ? [] : params.split('&');
  return [urlKey, urlPath, urlParams];
}

app.use(bodyParser.json());

app.use((req, res, next) => {
  logger.info('Got a request');
  logger.info(req.url);

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');

  next();
});

const findAction = (urlKey, params) => {
  if (urlKey in actions) {
    actions[urlKey](...params);
  } else {
    logger.err('DEFAULT_SWITCH');
    params[1].status(404).end('NOT FOUND');
  }
};

app.all('/*', (req, res) => {
  const [urlKey, urlPath, urlParams] = parseParams(req.url);
  logger.info(`URL ${urlPath}`);
  logger.info(`Params ${urlParams}`);
  try {
    const params = [req, res, urlPath, urlParams];
    findAction(urlKey, params);
  } catch (err) {
    logger.err('Strange Error Occurred');
    logger.err('INTERNAL SERVER ERROR');
    logger.err(err.message);
    logger.err(err.stack);
    res.status(500).end('INTERNAL SERVER ERROR');
  }
});

app.listen(process.env.APIPORT, (err) => {
  if (err) {
    logger.err(err);
  }
  console.info('----\n==> 🌎  API is running on port %s',
    process.env.APIPORT);
  console.info('==> 💻  Send requests to http://%s:%s',
    process.env.HOST, process.env.APIPORT);
});
