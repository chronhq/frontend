import express from 'express';
import locations from './locations';
import terrain from './terrain';

import { logger } from './helper';

const app = express();

function resolvePromise(action, req, res, url, params = []) {
  action(req, url, params)
    .then((result) => {
      res.json(result);
    }, (reason) => {
      logger.log('error occured while resolving promise');
      logger.log(reason);
    });
}

function parseParams(url) {
  const [path, params] = url.split('?');
  const splittedUrlPath = path.split('/').slice(1);
  const splittedUrlParams = typeof params === 'undefined' ? [] : params.split('&');
  return [splittedUrlPath, splittedUrlParams];
}

app.use((req, res) => {
  logger.info('Got a request');
  logger.info(req.url);
  const [splittedUrlPath, splittedUrlParams] = parseParams(req.url);
  logger.info(`URL ${splittedUrlPath}`);
  logger.info(`Params ${splittedUrlParams}`);
  try {
    switch (splittedUrlPath[0]) {
      case 'LOCATIONS':
        resolvePromise(locations, req, res, splittedUrlPath, splittedUrlParams);
        break;
      case 'TERRAIN':
        resolvePromise(terrain, req, res, splittedUrlPath, splittedUrlParams);
        break;
      default:
        logger.log('DEFAULT_SWITCH');
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
  console.info('----\n==> 🌎  API is running on port %s', process.env.APIPORT);
  console.info('==> 💻  Send requests to http://%s:%s', process.env.HOST, process.env.APIPORT);
});
