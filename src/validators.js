'use strict'

const validators = {
  string:require(__dirname + '/validators/string-validator.js'),
  int:require(__dirname + '/validators/int-validator.js'),
  float:require(__dirname + '/validators/float-validator.js'),
  email:require(__dirname + '/validators/email-validator.js'),
  bool:require(__dirname + '/validators/bool-validator.js'),
  array:require(__dirname + '/validators/array-validator.js')
}
const extensions = require(__dirname + '/extensions.js')


const get = (type, namespace) => {
  let validator = undefined
  if(namespace === undefined) {
    validator = validators[type]; // TODO if there is no validator of that type, we need to push an error
  }
  else {
    validator = extensions[namespace]
      .validators[type]; // TODO if there is no extension of that namespace or validator of that type, we need to push an error
  }
  // TODO attempt to get the validator from the schema cache
  return validator
}

//module.exports = validators
module.exports.get = get
