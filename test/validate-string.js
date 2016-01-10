'use strict';
const should = require('chai').should();
const expect = require('chai').expect;
const iceworm = require(__dirname + '/../index.js');
const FieldInfo = iceworm.FieldInfo;

describe('String Validator', () => {
  it('Required', () => {
    let schema = FieldInfo.create('test', "*string");
    let validation = iceworm.validators.string(undefined, schema);
    validation.valid.should.equal(false);
    validation.errors.length.should.equal(1);
    validation.errors[0].reason.should.equal("required");
  });
  it("Min length", () => {
    let schema = FieldInfo.create('test', "string>3");
    let validation = iceworm.validators.string("abc", schema);
    validation.valid.should.equal(false);
    validation.errors.length.should.equal(1);
    validation.errors[0].reason.should.equal("min");
  });
  it("Max Length", () => {
    let schema = FieldInfo.create('test', "string<3");
    let validation = iceworm.validators.string("abc", schema);
    validation.valid.should.equal(false);
    validation.errors.length.should.equal(1);
    validation.errors[0].reason.should.equal("max");
  });
});