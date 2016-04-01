'use strict'
const _ = require('lodash')

module.exports = (value, fieldInfo) => {
  return {
    valid: false,
    errors: [{message:`There is no known validator for the type '${fieldInfo.type}' of field '${fieldInfo.name}'`, reason:'missing'}]
  }
}