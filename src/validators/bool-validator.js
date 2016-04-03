'use strict';
const _ = require('lodash');

function create(fieldSchema) {
  return (value) => {
    let errors = [];
    if(fieldSchema.required && (_.isUndefined(value) || _.isNull(value))) {
      errors.push({message:"string is undefined or empty", reason:"required"});
    }
    else {
      try {
        Boolean(value);
      }
      catch(err) {
        errors.push({message:err.message, reason:"type"});
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
/*
module.exports = (value, fieldSchema) => {
  let errors = [];
  if(fieldSchema.required && (_.isUndefined(value) || _.isNull(value))) {
    errors.push({message:"string is undefined or empty", reason:"required"});
  }
  else {
    try {
      Boolean(value);
    }
    catch(err) {
      errors.push({message:err.message, reason:"type"});
    }
  }
  // and return the result
  return {
    valid: errors.length === 0,
    errors: errors
  }
};
*/

