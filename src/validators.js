'use strict'

const validators = {
  string:require(__dirname + '/validators/string-validator.js'),
  int:require(__dirname + '/validators/int-validator.js'),
  float:require(__dirname + '/validators/float-validator.js'),
  email:require(__dirname + '/validators/email-validator.js'),
  bool:require(__dirname + '/validators/bool-validator.js'),
  missing:require(__dirname + '/validators/missing.js')
}
const embedded = require(__dirname + '/validators/embedded-validator.js')
const extensions = require(__dirname + '/extensions.js')
const Schema = require(__dirname + '/Schema.js')
const validate = require(__dirname + '/validate.js')

const get = (fieldInfo) => {
  let validator = undefined
  if(fieldInfo.namespace === undefined) {
    if(validators.hasOwnProperty(fieldInfo.type)) {
      validator = validators[fieldInfo.type].create(fieldInfo)
    }
  }
  else {
    if(extensions[fieldInfo.namespace] !== undefined) {
      validator = extensions[fieldInfo.namespace].validators[fieldInfo.type]
    }
  }
  // no validator found yet? embedded type?
  if(validator === undefined) {
    validator = embedded.create(fieldInfo)
  }
  // still no validator found ... well, there is none then
  if(validator === undefined) {
    validator = validators.missing
  }
  // done
  return validator
}

//module.exports = validators
module.exports.get = get
