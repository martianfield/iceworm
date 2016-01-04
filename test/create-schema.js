'use strict';
const _ = require('lodash');
const should = require('chai').should();
const expect = require('chai').expect;
const iceworm = require(__dirname + '/../index.js');

describe('Schema Creation', () => {
  it('Fields count', () => {
    let raw = {
      name:'*string>10',
      age:'int',
      married:'bool'
    };
    let schema = iceworm.createSchema(raw);
    schema.length.should.equal(3);
    console.dir(schema);
  });
});