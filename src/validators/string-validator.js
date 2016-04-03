'use strict'

const _ = require('lodash')

function create(fieldInfo) {
  return (value) => {
    let errors = [];
    // make sure we have an actual text to work with and that we ignore trailing whitespace
    if(value === undefined || value === null) {
      value = '';
    }
    value = _.trim(value);

    // collect errors
    if(fieldInfo.required && value === '') {
      errors.push({message:"string is undefined or empty", reason:"required"});
    }
    if(fieldInfo.max) {
      if(value.length >= fieldInfo.max) {
        errors.push({message:"string is too long", reason:"max"})
      }
    }
    if(fieldInfo.min) {
      if(value.length <= fieldInfo.min) {
        errors.push({message:"string is too short", reason:"min"});
      }
    }

    // and return the result
    return {
      valid: errors.length === 0,
      errors: errors
    }
  }
}

module.exports.create = create
