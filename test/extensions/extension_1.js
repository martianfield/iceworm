'use strict';

const validate_thing = (value, fieldSchema) => {
  let errors = [];
  if(value === undefined || value === null) {
    if(fieldSchema.required) {
      errors.push({message:"thing is required", reason:'required'});
    }
    value = '';
  }
  if(value !== 'a thing') {
    errors.push({message: "thing is not 'a thing'", reason:'format'});
  }

  return {
    valid: errors.length == 0,
    errors: errors
  }
};

const validate_bling = (value, fieldSchema) => {
  let errors = [];
  if(value === undefined || value === null) {
    value = '';
  }
  if(value !== 'bling') {
    errors.push({message: "bling is not 'bling'", reason:'format'});
  }
};

const patch_thing = (value) => {
  if(value === null || value === undefined) {
    return undefined;
  }
  else {
    return value.toUpperCase();
  }
};

const patch_bling = (value) => {
  return "bling";
}

module.exports.validators = {
  'thing': validate_thing,
  'bling': validate_bling
};
module.exports.patchers = {
  'thing': patch_thing,
  'bling': patch_bling
}
