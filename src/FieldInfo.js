'use strict';
const validators = require(__dirname + '/validators.js')
const extensions = require(__dirname + '/extensions.js')
const _ = require('lodash')

class FieldInfo {
  constructor() {
    this.name = undefined
    this.namespace = undefined
    this.type = undefined
    this.array = false
    this.required = false
    this.hidden = false
    this.min = undefined
    this.max = undefined
  }

  validator() {
    let validator = undefined;
    if(this.namespace === undefined) {
      validator = validators[this.type]; // TODO if there is no validator of that type, we need to push an error
    }
    else {
      validator = extensions[this.namespace]
        .validators[this.type]; // TODO if there is no extension of that namespace or validator of that type, we need to push an error
    }
    return validator
  }

  static create(name, definition) {
    let re, matches
    let fi = new FieldInfo();

    if(definition === undefined) {
      definition = "";
    }

    let prefix_count = 0;
    // required
    if( _.startsWith(definition, '*', 0) || _.startsWith(definition, '*', 1)) {
      prefix_count += 1;
      fi.required = true;
    }
    // hidden
    if( _.startsWith(definition, '-', 0) || _.startsWith(definition, '-', 1)) {
      prefix_count += 1;
      fi.hidden = true;
    }

    // remove prefixes
    if(prefix_count > 0) {
      definition = definition.substring(prefix_count);
    }

    // type and namespace
    // re = /[a-zA-z\.]*/
    re = /[a-z\.]*/i
    matches = re.exec(definition)
    if(matches !== null) {
      let t_and_s = matches[0].toLowerCase().split('.');
      if(t_and_s.length > 1) {
        fi.namespace = t_and_s[0];
        fi.type = t_and_s[1];
      }
      else {
        fi.type = t_and_s[0];
      }
    }

    // array
    re = /^[(\*\-)(a-zA-Z)]*(\[\])/
    matches = re.exec(definition)
    if(matches !== null) {
      fi.array = true
    }

    // min
    re = />[0-9]*/;
    matches = re.exec(definition);
    if(matches !== null) {
      fi.min = Number(_.trimLeft(matches[0], '>'));
    }

    // max
    re = /<[0-9]*/;
    matches = re.exec(definition);
    if(matches !== null) {
      fi.max = Number(_.trimLeft(matches[0], '<'));
    }

    // done
    return fi;
  }
}

// exports
module.exports = FieldInfo;

