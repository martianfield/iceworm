// methods
const createFieldSchema = require(__dirname + '/src/createFieldSchema.js');
const createDocumentSchema = require(__dirname + '/src/createDocumentSchema.js');
const validate = require(__dirname + '/src/validate.js');
const patch = require(__dirname + '/src/patch.js');
const evaluate = require(__dirname + '/src/evaluate.js')
// collections
const validators = require(__dirname + '/src/validators.js');
const patchers = require(__dirname + '/src/patchers.js');

module.exports = {
  validate: validate,
  patch: patch,
  createFieldSchema: createFieldSchema,
  createDocumentSchema: createDocumentSchema,
  validators: validators,
  patchers: patchers,
  evaluate: evaluate
}