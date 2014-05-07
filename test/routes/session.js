
var expect = require('chai').expect;
var request = require('supertest');
var createApp = require('../..');


describe('session routes', function () {
  var SessionEndpoint = require('../../lib/endpoints/session');
  var app;

  beforeEach(function () {
    app = createApp();
  });

  describe('POST /core/session', function () {
    it('is defined', function (done) {
      var credentials = {
        email : 'jarvis@tuntscorp.com',
        password : 'senha123'
      };

      request(app)
        .post('/foo')
        .set('Content-Type', 'application/json')
        .send(credentials)
        .expect(function (res) {
          console.log(res);
          if (res.statusCode === 404) {
            throw new Error('POST /core/session is not defined');
          }
        })
        .end(done);
    });
  });


  describe('GET /core/session', function () {
  });
});
