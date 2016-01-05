'use strict';
const _ = require('lodash');

module.exports = (definition) => {
  if(definition === undefined) {
    definition = "";
  }
  return {
    type: parseType(definition),
    required: _.startsWith(definition, '*'),
    min:parseMin(definition),
    max:parseMax(definition)
  }
};

function parseType(definition) {
  if(_.startsWith(definition, '*')) {
    definition = _.trimLeft(definition, '*');
  }
  let re = /[a-zA-z]*/;
  let matches = re.exec(definition);
  if(matches !== null) {
    return matches[0].toLowerCase();
  }
  return undefined;
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


