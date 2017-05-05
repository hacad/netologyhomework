const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const restUrl = '/rest/users';

const mongoClient = require('mongodb');
const dbUrl = 'mongodb://localhost:27017/users';

function findUser(name, lastname, phone, cb) {
  mongoClient.connect(dbUrl, function(err, db){
    if(err){
      db.close();
      console.log(err);
      cb(err);
      return;
    }

    let findData = {};
    if(name) findData.name = name;
    if(lastname) findData.lastname = lastname;
    if(phone) findData.phone = phone;

    const users = db.collection('users');
    users.find(findData).toArray(function(err, result){
      db.close();
      cb(err, result);
    });
  });
}

function getAllUsers(cb) {
  mongoClient.connect(dbUrl, function(err, db){
    if(err){
      db.close();
      console.log(err);
      cb(err);
      return;
    }

    const users = db.collection('users');
    users.find().toArray(function(err, foundUsers){
      db.close();
      cb(err, foundUsers);
    });
  });
}

function addUser(name, lastname, phone, cb) {
  user = {
    name,
    lastname,
    phone
  }
  
  mongoClient.connect(dbUrl, function(err, db){
    if(err){
      db.close();
      console.log(err);
      cb(err);
      return;
    }

    const users = db.collection('users');
    users.insert(user, function(err, result){
      db.close();
      cb(err, result);
    });
  });
}

function deleteAllUsers(cb) {
  mongoClient.connect(dbUrl, function(err, db){
    if(err){
      db.close();
      console.log(err);
      cb(err);
      return;
    }

    const users = db.collection('users');
    users.remove(function(err, result){
      db.close();
      cb(err, result);
    });
  });
}

function deleteUser(id, cb) {
  mongoClient.connect(dbUrl, function(err, db){
    if(err){
      db.close();
      console.log(err);
      cb(err);
      return;
    }

    var objectID = mongoClient.ObjectID.createFromHexString(id);
    const users = db.collection('users');
    users.remove({_id: objectID}, function(err, result){
      db.close();
      cb(err, result);
    });
  });
}

function updateUser(id, name, lastname, phone, cb) {
  mongoClient.connect(dbUrl, function(err, db){
    if(err){
      db.close();
      console.log(err);
      cb(err);
      return;
    }

    var objectID = mongoClient.ObjectID.createFromHexString(id);

    var users = db.collection('users');
    users.findOne({_id: objectID}, function(err, result){
      if(err){
        db.close();
        console.log(err);
        cb(err);
        return;
      }

      if(!result){
        db.close();
        cb(null, null);
        return;
      }

      let newUserData = {};
      if(name){
        newUserData.name = name;
      }

      if(lastname){
        newUserData.lastname = lastname;
      }

      if(phone){
        newUserData.phone = phone;
      }
  
      if(Object.keys(newUserData).length > 0) {
        users.update({'_id': objectID}, {$set: newUserData}, function(err, result){
          db.close();
          if(err){
            console.log(err);
          }
          cb(err, result);
        });
      } else {
        db.close();
        cb(null,null);
      }
    });
  });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));

app.get(restUrl, (req, res) => {
  function sendResponse(err, result) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.json(200, JSON.stringify(result));
    }
  }

  if(Object.keys(req.query).length > 0){
    findUser(req.query.name, req.query.lastname, req.query.phone, sendResponse);
  } else {
    getAllUsers(sendResponse);
  }
});

app.post(restUrl, (req, res) => {
  if(!req.body) {
    return res.send(400, 'data to insert must be presented');
  }

  addUser(req.body.name, req.body.lastname, req.body.phone, function(err, result){
    if(err){
      console.log(err);
      res.sendStatus(500);
    } else {
      res.json(201, JSON.stringify(result));
    }
  });
});

app.put(restUrl, (req, res) => {
  if(!req.body || !req.body.id) {
    return res.send(400, 'object id must be presented');
  }

  updateUser(req.body.id, req.body.name, req.body.lastname, req.body.phone, function(err, result){
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

app.delete(restUrl + '/deleteallusers', (req, res) => {
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

app.delete(restUrl, (req, res) => {
  if(!req.body || !req.body.id) {
    return res.send(400, 'object id must be presented');
  }

  deleteUser(req.body.id, function(err, result){
    if(err){
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(1337);