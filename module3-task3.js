const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const usersRestUrl = '/rest/users';
const tasksRestUrl = '/rest/tasks';

const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost:27017/tasks';

mongoose.connect(dbUrl);

var UserSchema = new mongoose.Schema({
  name: String
});

var TaskSchema = new mongoose.Schema({
  name: String,
  description: String,
  closed: Boolean,
  user: String
});

var db = mongoose.connection;
db.on('error', function(err){
  console.log('connection error\n:' + err);
});

var User = db.model("User", UserSchema);
var Task = db.model("Task", TaskSchema);

//users
function findUser(name, cb) {
  User.find({name}, cb);
}

function getAllUsers(cb) {
  User.find(cb);
}

function addUser(name, cb) {
  var newUser = new User({name});
  newUser.save(cb);
}

function deleteAllUsers(cb) {
  User.remove(cb);
}

function deleteUser(id, cb) {
  var objectID = mongoose.Types.ObjectId(id);
  User.remove({_id: objectID}, cb);
}

function updateUser(id, name, cb) {
  var objectID = mongoose.Types.ObjectId(id);
  User.update({_id: objectID}, {name}, null, cb);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));

app.get(usersRestUrl, (req, res) => {
  function sendResponse(err, result) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.json(200, JSON.stringify(result));
    }
  }

  if(Object.keys(req.query).length > 0) {
    findUser(req.query.name, sendResponse);
  } else {
    getAllUsers(sendResponse);
  }
});

app.post(usersRestUrl, (req, res) => {
  if(!req.body) {
    return res.send(400, 'data to insert must be specified');
  }

  addUser(req.body.name, function(err, result){
    if(err){
      console.log(err);
      res.sendStatus(500);
    } else {
      res.json(201, JSON.stringify(result));
    }
  });
});

app.put(usersRestUrl, (req, res) => {
  if(!req.body || !req.body.id) {
    return res.send(400, 'object id must be specified');
  }

  updateUser(req.body.id, req.body.name, function(err, result){
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

app.delete(usersRestUrl + '/deleteallusers', (req, res) => {
  deleteAllUsers(function(err){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    else {
      res.sendStatus(200);
    }
  });
});

app.delete(usersRestUrl, (req, res) => {
  if(!req.body || !req.body.id) {
    return res.send(400, 'object id must be specified');
  }

  deleteUser(req.body.id, function(err, result){
    if(err){
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

//tasks
app.get(tasksRestUrl, (req, res) => {
  function sendResponse(err, result) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.json(200, JSON.stringify(result));
    }
  }

  if(Object.keys(req.query).length > 0){
    let queryData = {};
    if(req.query.name) {
      queryData.name = name;
    }

    if(req.query.description) {
      queryData.description = {$regex: req.query.description};
    }

    Task.find(queryData, sendResponse);
  } else {
    Task.find(sendResponse);
  }
});

app.post(tasksRestUrl, (req, res) => {
  if(!req.body) {
    res.send(400, 'data to insert must be specified');
    return;
  }

  if(!req.body.user || !req.body.name || !req.body.description) {
    res.send(400, 'all fields are required')
    return;
  }

  findUser(req.body.user, function(err, result) {
    if(err) {
      console.log(err);
      res.send(500, 'error occured');
      return;
    }

    if(!result.length) {
      res.send(400, 'user must exist')
      return;
    }

    var newTask = new Task({
        name: req.body.name,
        description: req.body.description,
        closed: false,
        user: req.body.user
    });

    newTask.save(function(err, result){
      if(err) {
        res.send(500, 'error occured');
      } else {
        res.send(201, result);
      }
    })
  });
});

app.put(tasksRestUrl, (req, res) => {
  if(!req.body || !req.body.id) {
    res.send(400, 'object id must be specified');
    return;
  }

  function sendResponse(err, result) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.json(200, JSON.stringify(result));
    }
  }

  const taskId = mongoose.Types.ObjectId(req.body.id);
  var updateData = {};
  if(req.body.description) updateData.description = req.body.description;
  if(req.body.name) updateData.name = req.body.name;
  if(req.body.closed) updateData.closed = req.body.closed;
  if(req.body.user) {
    findUser(req.body.user, function(err, result) {
      if(err) {
       console.log(err);
        res.send(500, 'error occured');
        return;
      }

      if(!result.length) {
        res.send(400, 'user must exist')
        return;
      }

      updateData.user = req.body.user;
      Task.update({_id: taskId}, {$set: updateData}, sendResponse);
    });
  } else {
    Task.update({_id: taskId}, {$set: updateData}, sendResponse);
  }
});

app.post(tasksRestUrl + '/assignto', (req, res) => {
  if(!req.body || !req.body.id || !req.body.user) {
    res.send(400, 'valid user and task id must be used');
    return;
  }

  findUser(req.body.user, function(err, result) {
    if(err) {
      console.log(err);
      res.send(500, 'error occured');
      return;
    }

    if(!result.length) {
      res.send(400, 'user must exist')
      return;
    }

    const taskId = mongoose.Types.ObjectId(req.body.id);
    Task.update({_id: taskId}, {$set: {user: req.body.user}}, function(err, result){
      if(err){
        console.log(err);
        res.send(500);
      } else {
        res.send(200, result);
      }
    });
  });
});

app.post(tasksRestUrl + '/close', (req, res) => {
  if(!req.body || !req.body.id) {
    res.send(400, 'task id must be specified');
    return;
  }

  const taskId = mongoose.Types.ObjectId(req.body.id);
  Task.update({_id: taskId}, {$set: {closed: true}}, function(err, result){
    if(err){
      console.log(err);
      res.send(500);
    } else {
      res.send(200, result);
    }
  });
});

app.post(tasksRestUrl + '/open', (req, res) => {
  if(!req.body || !req.body.id) {
    res.send(400, 'task id must be specified');
    return;
  }

  const taskId = mongoose.Types.ObjectId(req.body.id);
  Task.update({_id: taskId}, {$set: {closed: false}}, function(err, result){
    if(err){
      console.log(err);
      res.send(500);
    } else {
      res.send(200, result);
    }
  });
});

app.delete(tasksRestUrl + '/deletealltasks', (req, res) => {
  Task.remove({}, function(err){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    else {
      res.sendStatus(200);
    }
  });
});

app.delete(tasksRestUrl, (req, res) => {
  if(!req.body || !req.body.id) {
    return res.send(400, 'object id must be specified');
  }

  const taskId = mongoose.Types.ObjectId(req.body.id);
  Task.remove({_id: taskId}, function(err, result){
    if(err){
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});
app.listen(1337);