'use strict';

const FieldInfo = require(__dirname + '/FieldInfo.js');

module.exports = class Schema {
  constructor(raw, options) {
    this.__classid__ = Schema.__classid__ // TODO silly workaround because instanceof is not working when require-ing this class
    this._create(raw, options)
  }

  field(name) {
    return this.fields.find((item) => item.name.toLowerCase() === name.toLowerCase())
  }

  _create(raw, options) {
    this.options = options === undefined  ? {} : options
    this.raw = raw
    this.fields = []

    for(let prop in this.raw) {
      if(this.raw.hasOwnProperty(prop)) {
        this.fields.push(FieldInfo.create(prop, this.raw[prop]))
      }
    }
    this.options = options
  }

  static create(raw, options) {
    return new Schema(raw, options)
  }

  // TODO silly workaround because instanceof is not working when require-ing this class
  static get __classid__() {
    return '612948a9-3b2b-43be-ac78-a6d82c858b62'
  }

}


//module.exports = Schema;