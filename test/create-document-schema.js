'use strict';
const _ = require('lodash');
const should = require('chai').should();
const expect = require('chai').expect;
const iceworm = require(__dirname + '/../index.js');

describe('Document Schema Creation', () => {
  it('Fields count', () => {
    let raw = {
      name:'*string>10',
      age:'int',
      married:'bool'
    };
    let schema = iceworm.createDocumentSchema(raw);
    let fieldCount = 0;
    for(let field in schema) {
      if(schema.hasOwnProperty(field)) {
        fieldCount += 1;
      }
    }
    fieldCount.should.equal(3);
  });
});