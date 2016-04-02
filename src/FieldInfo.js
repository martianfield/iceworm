'use strict';

const validators = require(__dirname + '/validators.js')
const arrayValidator = require(__dirname + '/validators/array-validator.js')
const projectors = require(__dirname + '/projectors.js')
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
    this.unique = false
    this.min = undefined
    this.max = undefined
    // methods
    this.validate = undefined
    this.validateType = undefined
  }

  projector() {
    let projector = undefined

    if(this.namespace === undefined) {
      projector = projectors[this.type]
    }
    else {
      projector = extensions[this.namespace]
        .projectors[this.type]
    }

    return projector
  }


}

const create = (name, definition) => {
  let re, matches
  let fi = new FieldInfo();

  if(definition === undefined) {
    definition = "";
  }

  // name
  fi.name = name

  // required / hidden / unique
  // TODO this is one hell of an ugly way of implementing this
  let prefix_count = 0;
  if( _.startsWith(definition, '*', 0) || _.startsWith(definition, '*', 1) || _.startsWith(definition, '*', 2)) {
    prefix_count += 1;
    fi.required = true;
  }
  if( _.startsWith(definition, '-', 0) || _.startsWith(definition, '-', 1) || _.startsWith(definition, '-', 2)) {
    prefix_count += 1;
    fi.hidden = true;
  }
  if( _.startsWith(definition, '!', 0) || _.startsWith(definition, '!', 1) || _.startsWith(definition, '!', 2)) {
    prefix_count += 1;
    fi.unique = true;
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

  // the validator methods
  fi.validateType = validators.get(fi.type, fi.namespace)
  if(fi.array) {
    fi.validate = arrayValidator.create(fi)
  }
  else {
    fi.validate = fi.validateType
  }

  // done
  return fi;
}

// exports
module.exports.FieldInfo = FieldInfo
module.exports.create = create

