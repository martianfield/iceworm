'use strict'

const setthings = require('setthings')
const Schema = require(__dirname + '/../Schema')

function create(fieldInfo, options) {
  // do we have the required document schema in cache? if not, we cannot create a validator function
  // TODO BUG this is called for 'string' type ... why?
  let documentSchema = Schema.fromCache(fieldInfo.type)
  if(documentSchema === undefined) {
    return undefined
  }

  // TODO make sure options is in the documentation ... also, document it here
  options = setthings.merge(options, {ignoreRequired:false})

  return (obj) => {

    let errors = []

    // did we get an object?
    if(options.ignoreRequired === false) {
      if(obj === undefined) {
        errors.push({
          field: fieldInfo.name,
          message: `Missing the required embedded document '${fieldInfo.name}'`,
          reason: 'required'
        })
      }
    }

    // validate the object
    if(obj !== undefined) {
      documentSchema.fields.forEach((fi) => {

        let result = fi.validate(obj[fi.name], fi)

        if(!result.valid) {
          result.errors.forEach(error => {
            if(error.reason === 'required' && options.ignoreRequired) {
              return
            }
            errors.push({
              field:fi.name,
              message:error.message,
              reason:error.reason
            })
          })
        }
      })
    }

    return {
      valid: errors.length === 0,
      errors: errors
    }
  }
}


module.exports.create = create
