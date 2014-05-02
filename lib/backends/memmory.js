'use strict';

var _ = require('underscore');

var config = require('../../../config');

var MemmoryBackend = {};

exports = module.exports = MemmoryBackend;

var memmory = {};


function ensureBucket(bucketName) {
  var bucket = getBucket(bucketName);

  if (!bucket) {
    bucket = memmory[bucketName] = {};
  }

  return bucket;
}


function getBucket(bucketName) {
  return memmory[bucketName];
}



MemmoryBackend.createId = function (bucketName) {
  var bucket = getBucket(bucketName);
  var random = Math.floor(Math.random() * 1000001);
  var timestamp = new Date().getTime();
  var id = timestamp + random;

  return bucket && bucket[id] ? createId(bucketName) : id;
}


MemmoryBackend.get = function (bucketName, id, callback) {
  var bucket = getBucket(bucketName);
  var data = bucket && bucket[id] || null;

  setTimeout(function () {
    callback(null, data);
  }, 0);
};


MemmoryBackend.insert = function (bucketName, data, callback) {
  var bucket = ensureBucket(bucketName);
  var id = createId(bucketName);

  setTimeout(function () {
    data.id = id;
    bucket[id] = data;
    callback(null, id, data);
  }, 0);
};


MemmoryBackend.update = function (bucketName, id, update, callback) {
  MemmoryBackend.get(bucketName, id, function (err, data) {
    if (data) {
      _.extend(data, update);
      callback(null, data);
    } else {
      callback(null, null);
    }
  });
};


MemmoryBackend.remove = function (bucketName, id, callback) {
  var bucket = getBucket(bucketName);

  setTimeout(function () {
    if (bucket) {
      delete bucket[id];
    }

    callback(null, null);
  }, 0);
};

