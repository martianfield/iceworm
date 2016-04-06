'use strict'

// TODO this is all that there is left of this file ... might as well make it part of Schema.js
function validate(obj, documentSchema, options) {
  return documentSchema.validate(obj, options)
}

module.exports.validate = validate