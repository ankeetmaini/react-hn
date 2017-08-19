const express = require('express');
const path = require('path');
const compression = require('compression');
const bodyParser = require('body-parser');
const fetch = require('./src/utils/fetch');

const env = process.env.NODE_ENV;
const BASE_URL = process.env.SERVER;
const isDevelopment = env !== 'production';
const port = isDevelopment ? 3000 : process.env.PORT;
const app = express();
const publicPath = path.resolve(__dirname, 'public');

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

if (isDevelopment) {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('./webpack.config.js');
  const compiler = webpack(webpackConfig);
  app.use(
    webpackMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: {
        warnings: false,
        noInfo: true,
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false,
        errors: true,
        errorDetails: true,
      },
    }),
  );
  app.use(webpackHotMiddleware(compiler));
}

// handle serving of static assets
if (isDevelopment) {
  app.use('/assets', express.static(publicPath));
} else {
  app.use(compression());
  app.use(
    '/assets',
    express.static(publicPath, {
      setHeaders: (res) => {
        res.append('Cache-Control', 'public, max-age=31536000');
      },
    }),
  );
}

function getComments (allComments = [], item) {
  // base case, no comments :P
  allComments.push(item);
  if (!item || !item.kids) return Promise.resolve(item);

  return new Promise((resolve, reject) =>
    Promise.all(item.kids.map(i => fetch(`${BASE_URL}/item/${i}.json`)))
      .then(responses =>
        Promise.all(responses.map(getComments.bind(null, allComments))),
      )
      .then(() => resolve(allComments))
      .catch(err => reject(err)),
  );
}

app.get('/comments/:itemId', (req, res) => {
  // fetch comments recursively
  fetch(`${BASE_URL}/item/${req.params.itemId}.json`)
    .then(item => getComments([], item))
    .then(items => res.status(200).send(items));
});

app.get('*', (req, res) => {
  // handle annoying favicon.ico requests
  if (req.url === '/favicon.ico') {
    res.status(200).send({ 'Content-Type': 'image/x-icon' });
    res.end();
    return;
  }
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  if (isDevelopment) {
    const open = require('open');
    open('https://localhost:3000');
  }
  console.log(`App listening at https://localhost:${port}`);
});
