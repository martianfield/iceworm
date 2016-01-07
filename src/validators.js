const validators = {
  string:require(__dirname + '/validators/string-validator.js'),
  int:require(__dirname + '/validators/int-validator.js'),
  double:require(__dirname + '/validators/double-validator.js'),
  email:require(__dirname + '/validators/email-validator.js'),
  objectid:require(__dirname + '/validators/objectid-validator.js'),
  bool:require(__dirname + '/validators/bool-validator.js')
};

module.exports = validators;