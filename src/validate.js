'use strict'

const validators = require(__dirname + '/validators.js')
const merge = require('setthings').merge
const Schema = require(__dirname + '/Schema')

// TODO this is all that there is left of this file ... might as well drop it
function validate(obj, documentSchema, options) {
  return documentSchema.validate(obj, options)
}

module.exports.validate = validate