
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
          expect(res.statusCode).to.not.equal(HttpStatus.NOT_FOUND);
        })
        .end(done);
    });
  });


  describe('GET /core/session', function () {
    it('is defined', function (done) {
      var token = '0d4e6f831b8be192403d987e1e2285b7c5457cd8d9c525250f35c604566ac458';

      request(app)
        .get('/core/session')
        .set('Content-Type', 'application/json')
        .query({token : token})
        .expect(function (res) {
          expect(res.statusCode).to.not.equal(HttpStatus.NOT_FOUND);
        })
        .end(done);
    });
  });


  describe('DELETE /core/session', function () {
    it('is defined', function (done) {
      this.timeout(5000);

      var token = '0e1d384e442ecb9f43284f5b51eb3f94c84a6bbc496592f37fa4f153061e8bdb';

      request(app)
        .del('/core/session')
        .query({token : token})
        .expect(function (res) {
          expect(res.statusCode).to.not.equal(HttpStatus.NOT_FOUND);
        })
        .end(done);
    });
  });


  describe('POST /core/session/refresh', function () {
    it('is defined', function (done) {
      this.timeout(5000);

      var token = '50c5bd92c57b01fdf40e62808b1c54641a614ed611d81614f7a997cfdc4f21b1';
      var refresh = '2bcf2dd44304ede3a5e1ba87c8daf1c3a8f668b7570bd67825e8e86a6234b78c';

      request(app)
        .post('/core/session/refresh')
        .query({token : token})
        .send({refresh : refresh})
        .expect(function (res) {
          expect(res.statusCode).to.not.equal(HttpStatus.NOT_FOUND);
        })
        .end(done);
    });
  });
});
