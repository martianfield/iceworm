'use strict';
const should = require('chai').should();
const expect = require('chai').expect;
const iceworm = require(__dirname + '/../index.js');

describe('String Validator', () => {
  it('Required (undefined)', () => {
    let schema = iceworm.createFieldSchema("*bool");
    let validation = iceworm.validators.bool(undefined, schema);
    validation.valid.should.equal(false);
    validation.errors.length.should.equal(1);
    validation.errors[0].reason.should.equal("required");
  });
  it('Required (null)', () => {
    let schema = iceworm.createFieldSchema("*bool");
    let validation = iceworm.validators.bool(null, schema);
    validation.valid.should.equal(false);
    validation.errors.length.should.equal(1);
    validation.errors[0].reason.should.equal("required");
  });
});