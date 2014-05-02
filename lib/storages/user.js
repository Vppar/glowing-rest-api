
var MemmoryBackend = require('./backends/memmory');


var UserStorage = {};
exports = module.exports = UserStorage;


var USER_BUCKET = 'users';


function getId(userOrId) {
  return userOrId && userOrId.id || userOrId;
}


UserStorage.get = function (id, callback) {
  MemmoryBackend.get(USER_BUCKET, id, callback);
};


UserStorage.save = function (user, callback) {
  user.created = new Date().getTime();
  MemmoryBackend.insert(USER_BUCKET, user, callback);
};


UserStorage.update = function (userOrId, update, callback) {
  update.updated = new Date().getTime();
  MemmoryBackend.update(USER_BUCKET, getId(userOrId), update, callback);
};


UserStorage.remove = function (userOrId, callback) {
  MemmoryBackend.remove(USER_BUCKET, getId(userOrId), callback);
};
