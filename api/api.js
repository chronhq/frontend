import express from 'express';

const app = express();
function action() {
  return {
    message: 'This came from the api server',
    time: Date.now()
  };
}

app.use((req, res) => {
  console.info('Get a request');
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);
  console.info(splittedUrlPath);
  res.json(action());
});
app.listen(process.env.APIPORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.info('----\n==> 🌎  API is running on port %s', process.env.APIPORT);
  console.info('==> 💻  Send requests to http://%s:%s', process.env.HOST, process.env.APIPORT);
});
