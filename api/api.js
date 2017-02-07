import express from 'express';
import locations from './locations';
import terrain from './terrain';

import { logger, ERR, INFO } from './helper';

const app = express();

function resolvePromise(action, req, res, params = []) {
  action(req, params)
    .then((result) => {
      res.json(result);
    }, (reason) => {
      console.log('error occured while resolving promise');
      console.log(reason);
    });
}

app.use((req, res) => {
  logger('Got a request', INFO);
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);
  logger(splittedUrlPath, INFO);
  try {
    switch (splittedUrlPath[0]) {
      case 'LOCATIONS':
        resolvePromise(locations, req, res);
        break;
      case 'TERRAIN':
        resolvePromise(terrain, req, res);
        break;
      default:
        logger('DEFAULT_SWITCH');
        res.status(404).end('NOT FOUND');
    }
  } catch (err) {
    logger('Strange Error Occured', ERR);
    logger('INTERNAL SERVER ERROR', ERR);
    logger(err);
    res.status(500).end('INTERNAL SERVER ERROR');
  }
});
app.listen(process.env.APIPORT, (err) => {
  if (err) {
    logger(err, ERR);
  }
  console.info('----\n==> 🌎  API is running on port %s', process.env.APIPORT);
  console.info('==> 💻  Send requests to http://%s:%s', process.env.HOST, process.env.APIPORT);
});
