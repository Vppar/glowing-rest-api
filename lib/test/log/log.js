
var expect = require('chai').expect;
var request = require('supertest');
var createApp = require('../..');


describe('session routes', function () {
  var LogEndpoint = require('../../lib/endpoints/log');
  var app;

  beforeEach(function () {
    app = createApp();
  });

  describe('PUT /core/log', function () {
    it('is defined', function (done) {
      var log = {
          id : 1,
          level : 'fatal',
          message : 'Houston we have a problem', 
          facility : 'tnt.apollo.service',
          user : 'tiosam@tutnscorp.com',
          created: 1399526541234,
          duid : '9c51fa71-a021-11e3-9b98-030007000181',
          data : {
              mission : 'apollo 13',
              reporter : 'Jack Swigert',
              problem : 'Service module exploded'
          }
      };

      request(app)
        .post('/foo')
        .set('Content-Type', 'application/json')
        .send(log)
        .expect(function (res) {
          console.log(res);
          if (res.statusCode === 404) {
            throw new Error('PUT /core/log is not defined');
          }
        })
        .end(done);
    });
  });


  describe('GET /core/session', function () {
  });
});