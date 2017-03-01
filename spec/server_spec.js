'use strict'

const request = require('supertest');
const app = require('../server')

describe('GET /users', function(){
  it('should respond with JSON', function(done){
    request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [
        {
          id: 1
        },
        {
          id: 2
        },
        {
          id: 3
        }
      ])
      .end(finishTest(done));
  });
});

describe('GET /notes', function(){
  it('should respond with JSON', function(done){
    request(app)
      .get('/notes')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(finishTest(done));
  });
});


function finishTest (done) {
  return function (err) {
    if (err) {
      done.fail(err)
    } else {
      done()
    }
  }
}
