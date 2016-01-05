'use strict';
const _ = require('lodash');
const should = require('chai').should();
const expect = require('chai').expect;
const iceworm = require(__dirname + '/../index.js');

describe('ObjectID Validator', () => {
  it('required', () => {
    let schema = iceworm.createFieldSchema('*objectid');
    let result = iceworm.validators.objectid(undefined, schema);
    result.valid.should.equal(false);
    result.errors.length.should.equal(1);
    result.errors[0].reason.should.equal('required');
  });

  it('format (wrong)', () => {
    let schema = iceworm.createFieldSchema('objectid');
    let result = iceworm.validators.objectid('adfas', schema);
    result.valid.should.equal(false);
    result.errors.length.should.equal(1);
    result.errors[0].reason.should.equal('format');
  });

  it('format (correct)', () => {
    let schema = iceworm.createFieldSchema('objectid');
    let result = iceworm.validators.objectid('5683b9b108c91955203b0c7c', schema);
    result.valid.should.equal(true);
  })

});