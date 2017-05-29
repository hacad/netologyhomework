const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const restUrl = '/rest/users';

var users = [];
var userId = 0;

var addUser = function addUser(name, score) {
  user = {
    name,
    score,
    id: userId++
  }
  users.push(user);

  return user;
}

var deleteUser = function deleteUser(userId) {
  const index = users.findIndex((val) => val.id == userId);
  if(index > -1) {
    return users.splice(index, 1);
  } else {
    return false;
  }
}

var updateUser = function updateUser(userId, name, score) {
  const index = users.findIndex((val) => val.id == userId);
  if(index > -1) {
    users[index].name = name;
    users[index].score = score;
    return true;
  } else {
    return false;
  }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));

//rest api
app.get(restUrl, (req, res) => {
  res.json(200, JSON.stringify(users));
});

app.post(restUrl, (req, res) => {
  if(!req.body) {
    return res.send(400, 'object must be presented');
  }

  const addedUser = addUser(req.body.name, req.body.score);
  res.json(201, JSON.stringify(addedUser));
});

app.put(restUrl, (req, res) => {
  if(!req.body) {
    return res.send(400, 'object must be presented');
  }

  if(updateUser(req.body.id, req.body.name, req.body.score)) {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.delete(restUrl, (req, res) => {
  if(!req.body) {
    return res.send(400, 'object must be presented');
  }

  if(deleteUser(req.body.id)) {
    res.sendStatus(200);
  }
  else {
    res.sendStatus(404);
  }
});

app.listen(1337);