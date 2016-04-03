'use strict';
const _ = require('lodash');

function create(fieldInfo) {
  return (value) => {
    let errors = [];
    // required?
    if(fieldInfo.required) {
      if(value !== undefined || value !== null) {
        value = _.trim(value);
      }
      if(value === undefined || value === null || value === '') {
        errors.push({message:'email is required', reason:'required'});
      }
    }
    if(errors.length === 0) {
      if(value !== undefined && value !== null) {
        let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!re.test(value)) {
          errors.push({message:'invalid email format', reason:'format'});
        }
      }

      /*
       NOTE:
       The regular expression used here DOES NOT comply to the RFC standards.
       In my opinion, what we got here is good enough though. Mind that actual e-mail
       validation is about people submitting an e-mail address that actually works
       and that they have access to ... not about format.
       */
    }

    return {
      valid: errors.length === 0,
      errors: errors
    }
  }

}


module.exports.create = create