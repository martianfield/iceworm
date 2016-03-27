'use strict'
const _ = require('lodash')

module.exports = (value, fieldSchema) => {
  return {
    valid: false,
    errors: [{message:'there is no known validator for the type in question', reason:'missing'}]
  }
}