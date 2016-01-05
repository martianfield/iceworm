const parseDefinition = require(__dirname + '/src/parse-definition.js');
const createSchema = require(__dirname + '/src/create-schema.js');
const validators = {
  string:require(__dirname + '/src/validators/string-validator.js'),
  int:require(__dirname + '/src/validators/int-validator.js'),
  float:require(__dirname + '/src/validators/float-validator.js'),
  email:require(__dirname + '/src/validators/email-validator.js')
};

module.exports = {
  parseDefinition: parseDefinition,
  createSchema: createSchema,
  validators: validators
}