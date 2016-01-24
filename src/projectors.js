const projectors = {
  string:require(__dirname + '/projectors/string-projector.js'),
  int:require(__dirname + '/projectors/int-projector.js'),
  float:require(__dirname + '/projectors/float-projector.js'),
  email:require(__dirname + '/projectors/email-projector.js'),
  bool:require(__dirname + '/projectors/bool-projector.js'),
  array:require(__dirname + '/projectors/array-projector.js')
};

module.exports = projectors;