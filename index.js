// methods
const validate = require(__dirname + '/src/validate.js')
const project = require(__dirname + '/src/project.js')
const evaluate = require(__dirname + '/src/evaluate.js')
const extend = require(__dirname + '/src/extend.js')

// classes
const FieldInfo = require(__dirname + '/src/FieldInfo.js');
const Schema = require(__dirname + '/src/Schema.js');

// collections
const validators = require(__dirname + '/src/validators.js');
const projectors = require(__dirname + '/src/projectors.js');
const extensions = require(__dirname + '/src/extensions.js');
const cache = require(__dirname + '/src/cache.js')

module.exports = {
  validate: validate,
  project: project,
  validators: validators,
  projectors: projectors,
  cache: cache,
  evaluate: evaluate,
  extensions : extensions,
  extend: extend,
  FieldInfo: FieldInfo,
  Schema: Schema
}