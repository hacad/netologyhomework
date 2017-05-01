const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/testdb';

mongoClient.connect(url, function(err, db){
  if(err){
    console.log(`Cannot connect to db: ${err}`)
  } else {
    console.log('Connection is established');

    var users = db.collection('users');
    users.deleteMany({});
    var user1 = {name: 'user1', gender: 'f'};
    var user2 = {name: 'user2', gender: 'f'};
    var user3 = {name: 'user3', gender: 'm'};

    users.insert([user1, user2, user3], function(err, result){
      if(err) {
        console.log(err);
      } else {
        console.log('Added users:')
        users.find().toArray(function(err, foundedUsers) {
          console.log(foundedUsers);

          users.update({name: 'user1'}, {name: 'user11', gender: 'f'}, function(err, result){
            console.log('Updated users:');
            users.find().toArray(function(err, updatedUsers) {
              console.log(updatedUsers);

              console.log('Users after delete:');
              users.remove({name: 'user11'}, function(err, result){
                users.find().toArray(function(err, deletedUsers) {
                  console.log(deletedUsers);

                  db.close();
                });
              });
            });    
          });
        });
      }
    });
  }
});
