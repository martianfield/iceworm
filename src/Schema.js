'use strict';

const FieldInfo = require(__dirname + '/FieldInfo.js');

module.exports = class Schema {
  constructor() {
    this.fields = {}
    this.options = undefined
    // TODO silly workaround because instanceof is not working when require-ing this class
    this.__classid__ = Schema.__classid__
  }

  static create(raw, options) {
    let schema = new Schema()
    for(let prop in raw) {
      if(raw.hasOwnProperty(prop)) {
        schema.fields[prop] = FieldInfo.create(prop, raw[prop])
      }
    }
    schema.options = options
    return schema
  }

  // TODO silly workaround because instanceof is not working when require-ing this class
  static get __classid__() {
    return '612948a9-3b2b-43be-ac78-a6d82c858b62'
  }

}


//module.exports = Schema;