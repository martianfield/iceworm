'use strict'

const FieldInfo = require(__dirname + '/FieldInfo.js')
const validate = require(__dirname + '/validate.js')
const cache = require(__dirname + '/cache.js')
const setthings = require('setthings')


module.exports = class Schema {
  constructor(raw, name) {
    this.__classid__ = Schema.__classid__ // TODO silly workaround because instanceof is not working when require-ing this class
    this.name = name
    this.raw = raw
    this.fields = []

    // create field infos
    for(let prop in this.raw) {
      if(this.raw.hasOwnProperty(prop)) {
        this.fields.push(FieldInfo.create(prop, this.raw[prop]))
      }
    }

    // cache (if name was given)
    this.cache()
  }

  /**
   * Returns the FieldInfo with the given name.
   * @param name
   * @returns {T}
   */
  getFieldInfo(name) {
    return this.fields.find((item) => item.name.toLowerCase() === name.toLowerCase())
  }

  /**
   * Caches the schema if it the .name property is set.
   * Returns 'true' if the schema was actually cached.
   * @returns {boolean}
   */
  cache() {
    if(this.name !== undefined) {
      cache.schemas[this.name] = this
      return true
    }
    else {
      return false
    }
  }

  validate (obj, options) {
    // TODO make sure options is in the documentation ... also, document it here
    options = setthings.merge(options, {ignoreRequired: false})

    let errors = []

    this.fields.forEach((fi) => {

      let result = fi.validate(obj[fi.name], fi)

      if (!result.valid) {
        result.errors.forEach(error => {
          if (error.reason === 'required' && options.ignoreRequired) {
            return
          }
          errors.push({
            field: fi.name,
            message: error.message,
            reason: error.reason
          })
        })
      }
    })

    return {
      valid: errors.length === 0,
      errors: errors
    }
  }

  /**
   * Create a schema. If the the 'name' parameter is give, the schema is also cached.
   * @param raw
   * @param name
   * @returns {Schema}
   */
  static create(raw, name) {
    return new Schema(raw, name)
  }

  /**
   * Retrieve a schema from the cache
   * @param name
   * @returns {*}
   */
  static fromCache(name) {
    if(cache.schemas.hasOwnProperty(name)) {
      return cache.schemas[name]
    }
    else {
      return undefined
    }
  }

  /**
   * Purges the schema cache
   */
  static purgeCache() {
    cache.schemas = {}
  }

  /**
   * Returns all cached schemas
   * @returns {cache.schemas|{}}
   */
  static getCached() {
    return cache.schemas
  }

  // TODO silly workaround because instanceof is not working when require-ing this class
  static get __classid__() {
    return '612948a9-3b2b-43be-ac78-a6d82c858b62'
  }

}

// TODO get rid of the static methods and make them module functions instead
// TODO make validate a function of Schema ... note that we also use validate.js to get a closured validation method for embedded types
