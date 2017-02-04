import express from 'express';
import locations from './locations';

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
  console.info('Get a request');
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);
  console.info(splittedUrlPath);
  try {
    switch (splittedUrlPath[0]) {
      case 'LOCATIONS':
        resolvePromise(locations, req, res);
        break;
      default:
        console.log('DEFAULT_SWITCH');
        res.status(404).end('NOT FOUND');
    }
  } catch (err) {
    console.log('Error occured');
    console.log(err);
    res.status(500).end('INTERNAL SERVER ERROR');
  }
});
app.listen(process.env.APIPORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.info('----\n==> 🌎  API is running on port %s', process.env.APIPORT);
  console.info('==> 💻  Send requests to http://%s:%s', process.env.HOST, process.env.APIPORT);
});
