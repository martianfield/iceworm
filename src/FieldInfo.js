'use strict';
const _ = require('lodash');

class FieldInfo {
  constructor(name, namespace, type, required, min, max) {
    this.name = name;
    this.namespace = namespace;
    this.type = type;
    this.required = required;
    this.min = min;
    this.max = max;
  }

  static create(name, definition) {
    if(definition === undefined) {
      definition = "";
    }
    let namespace, type, required, min, max, re, matches = undefined;

    // required
    required = _.startsWith(definition, '*');

    // type and namespace
    if(_.startsWith(definition, '*')) {
      definition = _.trimLeft(definition, '*');
    }
    re = /[a-zA-z.]*/;
    matches = re.exec(definition);
    if(matches !== null) {
      let t_and_s = matches[0].toLowerCase().split('.');
      if(t_and_s.length > 1) {
        namespace = t_and_s[0];
        type = t_and_s[1];
      }
      else {
        type = t_and_s[0];
      }
    }

    // min
    re = />[0-9]*/;
    matches = re.exec(definition);
    if(matches !== null) {
      min = Number(_.trimLeft(matches[0], '>'));
    }

    // max
    re = /<[0-9]*/;
    matches = re.exec(definition);
    if(matches !== null) {
      max = Number(_.trimLeft(matches[0], '<'));
    }

    // done
    return new FieldInfo(name, namespace, type, required, min, max);
  }
}

// exports
module.exports = FieldInfo;