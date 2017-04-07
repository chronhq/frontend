import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';

import locations from './locations';
import terrain from './terrain';
import borders from './borders';
import properties from './properties';
import facts from './facts';
import persons from './persons';

import { logger } from './helper';

const app = express();

function parseParams(url) {
  const [path, params] = url.split('?');
  const splittedUrlPath = path.split('/').slice(1);
  const splittedUrlParams = typeof params === 'undefined'
    ? [] : params.split('&');
  return [splittedUrlPath, splittedUrlParams];
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

app.all('/*', (req, res) => {
  const [splittedUrlPath, splittedUrlParams] = parseParams(req.url);
  logger.info(`URL ${splittedUrlPath}`);
  logger.info(`Params ${splittedUrlParams}`);
  try {
    const params = [req, res, splittedUrlPath, splittedUrlParams];
    switch (splittedUrlPath[0]) {
      case 'LOCATIONS':
        locations(...params);
        break;
      case 'TERRAIN':
        terrain(...params);
        break;
      case 'BORDERS':
        borders(...params);
        break;
      case 'PROPERTIES':
        properties(...params);
        break;
      case 'FACTS':
        facts(...params);
        break;
      case 'PERSONS':
        persons(...params);
        break;
      default:
        logger.err('DEFAULT_SWITCH');
        res.status(404).end('NOT FOUND');
    }
  } catch (err) {
    logger.err('Strange Error Occured');
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
