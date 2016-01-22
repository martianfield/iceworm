const patchers = {
  string:require(__dirname + '/patchers/string-patcher.js'),
  int:require(__dirname + '/patchers/int-patcher.js'),
  float:require(__dirname + '/patchers/float-patcher.js'),
  email:require(__dirname + '/patchers/email-patcher.js'),
  bool:require(__dirname + '/patchers/bool-patcher.js'),
  array:require(__dirname + '/patchers/array-patcher.js')
};

module.exports = patchers;