'use strict';
const _ = require('lodash');

module.exports = (definition) => {
  if(definition === undefined) {
    definition = "";
  }
  let typeAndNamespace = parseTypeAndNamespace(definition);

  return {
    type: typeAndNamespace.type,
    namespace: typeAndNamespace.namespace,
    required: _.startsWith(definition, '*'),
    min:parseMin(definition),
    max:parseMax(definition)
  }
};

function parseTypeAndNamespace(definition) {
  let result = {
    type:undefined,
    namespace:undefined
  };

  if(_.startsWith(definition, '*')) {
    definition = _.trimLeft(definition, '*');
  }

  let re = /[a-zA-z.]*/;
  let matches = re.exec(definition);
  if(matches !== null) {
    let t_and_s = matches[0].toLowerCase().split('.');
    if(t_and_s.length > 1) {
      result.namespace = t_and_s[0];
      result.type = t_and_s[1];
    }
    else {
      result.type = t_and_s[0];
    }
  }
  return result;
}

function parseMin(definition) {
  let re = />[0-9]*/;
  let matches = re.exec(definition);
  if(matches !== null) {
    return Number(_.trimLeft(matches[0], '>'));
  }
  return undefined;
}

function parseMax(definition) {
  let re = /<[0-9]*/;
  let matches = re.exec(definition);
  if(matches !== null) {
    return Number(_.trimLeft(matches[0], '<'));
  }
  return undefined;
}


