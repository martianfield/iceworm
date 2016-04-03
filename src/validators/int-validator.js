'use strict'

function create(fieldInfo) {
  return (value) => {
    let errors = [];

    if(value === undefined || value === null) {
      if(fieldInfo.required) {
        errors.push({message:'value not provided', reason:'required'});
      }
    }
    else {
      if(isNaN(value)) {
        errors.push({message:'not a number', reason:'type'})
      }
      else if(typeof value === 'boolean') {
        errors.push({message:'not a number', reason:'type'})
      }
      else {
        value = Number(value)
        if((value % 1) !== 0) {
          errors.push({message:'not an integer', reason:'type'});
        }
        else {
          value = parseInt(value);

          if(fieldInfo.min) {
            if(value < fieldInfo.min) {
              errors.push({message:'value too small', reason:'min'});
            }
          }
          if(fieldInfo.max) {
            if(value >= fieldInfo.max) {
              errors.push({message:'value too large', reason:'max'});
            }
          }
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors:errors
    }
  }
}

module.exports.create = create