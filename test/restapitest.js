const supertest = require('supertest');
const expect = require('chai').expect;

describe('REST API', () => {
  let server;
  let address = 'http://localhost:1337';

  before(done => {
    require('../module2-task2.js');
    setTimeout(() => {
      server = supertest.agent(address);
      done();
    }, 1000);
  });

  it('POST /rest/users should add new user', done =>{
    server
      .post('/rest/users')
      .send({name: 'test', score: 1})
      .expect(201)
      .end((err, response) => {
        let newUser = JSON.parse(response.body);
        expect(newUser).to.eql({id: 0, name: 'test', score: 1});
        done();
    });
  });

  it('DELETE /rest/users should delete user', done =>{
    server
      .delete('/rest/users')
      .send({id: 0})
      .expect(200, done)
  });
});