'use strict';
const _ = require('lodash');

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