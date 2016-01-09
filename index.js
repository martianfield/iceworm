// methods
const createFieldSchema = require(__dirname + '/src/createFieldSchema.js');
const createDocumentSchema = require(__dirname + '/src/createDocumentSchema.js');
const validate = require(__dirname + '/src/validate.js');
const patch = require(__dirname + '/src/patch.js');
const evaluate = require(__dirname + '/src/evaluate.js');
const extend = require(__dirname + '/src/extend.js');

// collections
const validators = require(__dirname + '/src/validators.js');
const patchers = require(__dirname + '/src/patchers.js');
const extensions = require(__dirname + '/src/extensions.js');

module.exports = {
  validate: validate,
  patch: patch,
  createFieldSchema: createFieldSchema,
  createDocumentSchema: createDocumentSchema,
  validators: validators,
  patchers: patchers,
  evaluate: evaluate,
  extensions : extensions,
  extend: extend
}