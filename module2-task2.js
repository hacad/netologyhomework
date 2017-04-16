const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const restUrl = '/rest/users';
const rpcUrl = '/rpc';

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


//rpc
const methods = {
  addUser,
  updateUser,
  deleteUser,
  'getUser': function(id) {
    if(id) {
      const index = users.findIndex((val) => val.id == id);
      if(index > -1) {
        return users[index];
      }
    } else {
      return users;
    }
  }
};

app.post(rpcUrl, (req, res) => {
  const method = methods[req.body.method];
  
  switch(req.body.method.toLowerCase()) {
    case 'getuser':
      let returnValue = method(req.body.id);
      if(returnValue){
        res.json(200, returnValue);
      } else {
        res.send(404);
      }
    break;
    case 'adduser':
      let returnValue = method(req.body.name, req.body.score);
      res.json(201, returnValue);
    break;
    case 'updateuser':
      if(method(req.body.id, req.body.name, req.body.score)) {
        res.send(200);
      } else {
        res.send(404);
      }
    break;
    case 'deleteuser':
      if(method(req.body.id)) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    break;
    default:
      res.send(400, 'Unknown method. Only: getUser, addUser, updateUser, deleteUser methods are allowed');
    break;
  }
});
app.listen(1337);