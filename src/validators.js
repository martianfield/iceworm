const validators = {
  string:require(__dirname + '/validators/string-validator.js'),
  int:require(__dirname + '/validators/int-validator.js'),
  float:require(__dirname + '/validators/float-validator.js'),
  email:require(__dirname + '/validators/email-validator.js'),
  bool:require(__dirname + '/validators/bool-validator.js'),
  array:require(__dirname + '/validators/array-validator.js')
};

module.exports = validators;