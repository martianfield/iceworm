'use strict'
const _ = require('lodash')

const create = (fieldInfo) => {
  let validator = (value) => {
    let errors = [];

    if(fieldInfo.required && (_.isUndefined(value) || _.isNull(value))) {
      errors.push({message:"array is undefined or empty", reason:"required"});
    }
    else {
      if(value.constructor === Array) {
        // check all fields
        let validate = fieldInfo.typeValidator
        value.forEach((item) => {
          let result = validate(item, fieldInfo)
          if(!result.valid) {
            result.errors.forEach((error, idx) => {
              errors.push({message:`error in array at [${idx}]: ${error.message}`, reason:error.reason})
            })
          }
        })
      }
      else {
        // field is not an array
        errors.push({message:"field is not an array", reason:"type"})
      }
    }

    // and return the result
    return {
      valid: errors.length === 0,
      errors: errors
    }
  }

  return validator
}

module.exports.create = create

/*
module.exports = (value, fieldInfo) => {
  let errors = [];

  if(fieldInfo.required && (_.isUndefined(value) || _.isNull(value))) {
    errors.push({message:"array is undefined or empty", reason:"required"});
  }
  else {
    if(value.constructor === Array) {
      // check all fields
      let validate = fieldInfo.validator()
      value.forEach((item) => {
        let result = validate(item, fieldInfo)
        if(!result.valid) {
          result.errors.forEach((error, idx) => {
            errors.push({message:`error in array at [${idx}]: ${error.message}`, reason:error.reason})
          })
        }
      })
    }
    else {
      // field is not an array
      errors.push({message:"field is not an array", reason:"type"})
    }
  }

  // and return the result
  return {
    valid: errors.length === 0,
    errors: errors
  }
}
*/