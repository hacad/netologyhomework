const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));

app.get('/', (req, res) => {
  res.send(200, 'Hello, Express.js');
});

app.get('/hello', (req, res) => {
  res.send(200, 'Hello, stranger!');
});

app.get('/hello/:name', (req, res) => {
  res.send(200, `Hello, ${req.params.name}!`);
});

app.get('/sub/*', (req, res) => {
  res.send(200, `You requested: ${req.protocol}://${req.host}${req.originalUrl}`);
});

const middleware = function(req, res, next) {
  if(!req.headers['key']) {
    res.send(401);    
  } else {
    next();
  }
}
app.post('/', middleware, (req, res) => {
  if(Object.keys(req.body) <= 1) {
    return res.send(404);
  }

  res.json(200, JSON.stringify(req.body));
});

app.listen(1337);