
var expect = require('chai').expect;
var request = require('supertest');
var createApp = require('../..');

var HttpStatus = require('../../lib/enum/httpStatus');

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
        .post('/core/session')
        .set('Content-Type', 'application/json')
        .send(credentials)
        .expect(function (res) {
          if (res.statusCode === HttpStatus.NOT_FOUND) {
            throw new Error('POST /core/session is not defined');
          }
        })
        .end(done);
    });
  });


  describe('GET /core/session', function () {
    it('is defined', function (done) {
      var token = '0e1d384e442ecb9f43284f5b51eb3f94c84a6bbc496592f37fa4f153061e8bdb';

      request(app)
        .get('/core/session')
        .set('Content-Type', 'application/json')
        .query({token : token})
        .expect(function (res) {
          console.log(res);
          if (res.statusCode === HttpStatus.NOT_FOUND) {
            throw new Error('GET /core/session is not defined');
          }
        })
        .end(done);
    });
  });
});
