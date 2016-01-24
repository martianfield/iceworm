'use strict';

module.exports = (value, fieldSchema) => {
  let errors = [];

  if(value === undefined || value === null) {
    if(fieldSchema.required) {
      errors.push({message:'value not provided', reason:'required'});
    }
  }
  else {
    if(isNaN(value)) {
      errors.push({message:'not a number', reason:'type'});
    }
    else if(typeof value === 'boolean') {
      errors.push({message:'not a number', reason:'type'})
    }
    else {
      value = parseFloat(value);

      if(fieldSchema.min) {
        if(value < fieldSchema.min) {
          errors.push({message:'value too small', reason:'min'});
        }
      }
      if(fieldSchema.max) {
        if(value >= fieldSchema.max) {
          errors.push({message:'value too large', reason:'max'});
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors:errors
  }
}