'use strict';

const FieldInfo = require(__dirname + '/FieldInfo.js');

module.exports = class Schema {
  constructor(raw, embedded) {
    this.embedded = embedded === undefined ? {} : embedded
    this.__classid__ = Schema.__classid__ // TODO silly workaround because instanceof is not working when require-ing this class
    this._create(raw, embedded)
  }

  field(name) {
    return this.fields.find((item) => item.name.toLowerCase() === name.toLowerCase())
  }

  _create(raw, embedded) {
    this.embedded = embedded === undefined  ? {} : embedded
    this.raw = raw
    this.fields = []

    for(let prop in this.raw) {
      if(this.raw.hasOwnProperty(prop)) {
        this.fields.push(FieldInfo.create(prop, this.raw[prop], this.embedded))
      }
    }
    this.embedded = embedded
  }

  static create(raw, options) {
    return new Schema(raw, options)
  }

  // TODO silly workaround because instanceof is not working when require-ing this class
  static get __classid__() {
    return '612948a9-3b2b-43be-ac78-a6d82c858b62'
  }

}

// TODO get rid of the static create method and make it a module function instead
