const ObjectID = require('mongodb').ObjectID;

module.exports = (obj) => {
  if(obj === null || obj === undefined ) {
    return obj;
  }
  if(ObjectID.isValid(obj)) {
    return ObjectID.createFromHexString(obj);
  }
  else {
    return undefined;
  }
}


/*

 'use strict';
 const ObjectID = require('mongodb').ObjectID;

 module.exports = (value, fieldSchema) => {
 let errors = [];
 if(fieldSchema.required && (value === undefined || value === null)) {
 errors.push({message:'missing objectid', reason:'required'});
 }
 else if(!ObjectID.isValid(value)) {
 errors.push({message:'not a valid ObjectID representation', reason:'format'});
 }

 return {
 valid: errors.length === 0,
 errors: errors
 };
 };

 */