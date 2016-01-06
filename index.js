const createFieldSchema = require(__dirname + '/src/createFieldSchema.js');
const createDocumentSchema = require(__dirname + '/src/createDocumentSchema.js');
const validators = {
  string:require(__dirname + '/src/validators/string-validator.js'),
  int:require(__dirname + '/src/validators/int-validator.js'),
  double:require(__dirname + '/src/validators/double-validator.js'),
  email:require(__dirname + '/src/validators/email-validator.js'),
  objectid:require(__dirname + '/src/validators/objectid-validator.js'),
  bool:require(__dirname + '/src/validators/bool-validator.js')
};

module.exports = {
  // validate: () => {},
  // map: () => {},
  createFieldSchema: createFieldSchema,
  createDocumentSchema: createDocumentSchema,
  validators: validators
}