// methods
const validate = require(__dirname + '/src/validate.js');
const patch = require(__dirname + '/src/patch.js');
const evaluate = require(__dirname + '/src/evaluate.js');
const extend = require(__dirname + '/src/extend.js');

// classes
const FieldInfo = require(__dirname + '/src/FieldInfo.js');
const Schema = require(__dirname + '/src/Schema.js');

// collections
const validators = require(__dirname + '/src/validators.js');
const patchers = require(__dirname + '/src/patchers.js');
const extensions = require(__dirname + '/src/extensions.js');

module.exports = {
  validate: validate,
  patch: patch,
  validators: validators,
  patchers: patchers,
  evaluate: evaluate,
  extensions : extensions,
  extend: extend,
  FieldInfo: FieldInfo,
  Schema: Schema
}