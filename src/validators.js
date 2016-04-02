'use strict'

const validators = {
  string:require(__dirname + '/validators/string-validator.js'),
  int:require(__dirname + '/validators/int-validator.js'),
  float:require(__dirname + '/validators/float-validator.js'),
  email:require(__dirname + '/validators/email-validator.js'),
  bool:require(__dirname + '/validators/bool-validator.js'),
  missing:require(__dirname + '/validators/missing.js')
}
const extensions = require(__dirname + '/extensions.js')
const Schema = require(__dirname + '/Schema.js')
const validate = require(__dirname + '/validate.js')

const get = (type, namespace) => {
  let validator = undefined
  if(namespace === undefined) {
    validator = validators[type]
  }
  else {
    if(extensions[namespace] !== undefined) {
      validator = extensions[namespace].validators[type]
    }
  }
  // no validator found yet? embedded type?
  if(validator === undefined) {
    let schema = Schema.fromCache(type)
    if(schema !== undefined) {
      validator = validate.create(schema, {})
    }
    else {
      // still no validator found? return the 'missing' validator
      validator = validators.missing
    }
  }

  // done
  return validator
}

//module.exports = validators
module.exports.get = get
