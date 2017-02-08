import express from 'express';
import locations from './locations';
import terrain from './terrain';

import { logger } from './helper';

const app = express();

function resolvePromise(action, req, res, params = []) {
  action(req, params)
    .then((result) => {
      res.json(result);
    }, (reason) => {
      logger.log('error occured while resolving promise');
      logger.log(reason);
    });
}

app.use((req, res) => {
  logger.info('Got a request');
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);
  logger.info(splittedUrlPath);
  try {
    switch (splittedUrlPath[0]) {
      case 'LOCATIONS':
        resolvePromise(locations, req, res);
        break;
      case 'TERRAIN':
        resolvePromise(terrain, req, res);
        break;
      default:
        logger.log('DEFAULT_SWITCH');
        res.status(404).end('NOT FOUND');
    }
  } catch (err) {
    logger.err('Strange Error Occured');
    logger.err('INTERNAL SERVER ERROR');
    logger.err(err);
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
