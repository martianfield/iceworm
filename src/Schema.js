'use strict';

const FieldInfo = require(__dirname + '/FieldInfo.js');

class Schema {
  constructor() {
    this.fields = {};
  }

  static create(raw) {
    let schema = new Schema();
    for(let prop in raw) {
      if(raw.hasOwnProperty(prop)) {
        schema.fields[prop] = FieldInfo.create(prop, raw[prop]);
      }
    }
    return schema;
  }
}


module.exports = Schema;