const patchers = {
  string:require(__dirname + '/patchers/string-patcher.js'),
  int:require(__dirname + '/patchers/int-patcher.js'),
  double:require(__dirname + '/patchers/double-patcher.js'),
  email:require(__dirname + '/patchers/email-patcher.js'),
  objectid:require(__dirname + '/patchers/objectid-patcher.js'),
  bool:require(__dirname + '/patchers/bool-patcher.js')
};

module.exports = patchers;