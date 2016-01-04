'use strict';
const _ = require('lodash');

module.exports = (value, fieldSchema) => {
  let errors = [];
  // make sure we have an actual text to work with and that we ignore trailing whitespace
  if(value === undefined || value === null) {
    value = '';
  }
  value = _.trim(value);

  // collect errors
  if(fieldSchema.required && value === '') {
    errors.push({message:"string is undefined or empty", reason:"required"});
  }
  if(fieldSchema.max) {
    if(value.length >= fieldSchema.max) {
      errors.push({message:"string is too long", reason:"max"})
    }
  }
  if(fieldSchema.min) {
    if(value.length <= fieldSchema.min) {
      errors.push({message:"string is too short", reason:"min"});
    }
  }

  // and return the result
  return {
    valid: errors.length === 0,
    errors: errors
  }
};