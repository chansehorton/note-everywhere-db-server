'use strict'

const request = require('supertest');
const app = require('../server')

describe('GET /notes', function(){
  it('should respond with an array of all note objects', function(done){
    request(app)
      .get('/notes')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [
        {
          "id": 1,
          "user_id": 1,
          "url": "campspot.com",
          "note": "user 1 made a note",
          "note_position": "left"
        },
        {
          "id": 2,
          "user_id": 1,
          "url": "stackoverflow.com/questions/42541327/how-to-add-a-gradient-layer-on-top-of-an-imageview",
          "note": "some user 1 stack notes",
          "note_position": "left"
        },
        {
          "id": 3,
          "user_id": 1,
          "url": "www.indeed.com/cmp/Cascade-Recruiting/jobs/Software-Engineer-Implementation-Specialist-15ac1e80231c4aa3",
          "note": "user 1 notes about job",
          "note_position": "right"
        },
        {
          "id": 4,
          "user_id": 2,
          "url": "campspot.com",
          "note": "user 2 made a note",
          "note_position": "right"
        },
        {
          "id": 5,
          "user_id": 2,
          "url": "stackoverflow.com/questions/42541327/how-to-add-a-gradient-layer-on-top-of-an-imageview",
          "note": "some user 2 stack notes",
          "note_position": "right"
        },
        {
          "id": 6,
          "user_id": 2,
          "url": "www.indeed.com/cmp/Cascade-Recruiting/jobs/Software-Engineer-Implementation-Specialist-15ac1e80231c4aa3",
          "note": "user 2 notes about job",
          "note_position": "left"
        }
      ])
      .end(finishTest(done));
  });
});

describe('POST /notes', function(){
  it('should return the newly created entry', function(done){
    const note = {
      id: 7,
      user_id: 3,
      url: "",
      note: "",
      note_position: "right"
    }

    request(app)
      .post('/create-note')
      .send(note)
      .expect('Content-Type', /json/)
      .expect(200, {
        "id": 7,
        "user_id": 3,
        "url": "",
        "note": "",
        "note_position": "right"
      })
      .end(finishTest(done));
  });

  it('should see the newly added entry on a get/:id query', function(done) {
    request(app)
      .get('/notes/7')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        "id": 7,
        "user_id": 3,
        "url": "",
        "note": "",
        "note_position": "right"
      })
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
