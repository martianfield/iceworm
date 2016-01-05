'use strict';
const should = require('chai').should();
const expect = require('chai').expect;
const iceworm = require(__dirname + '/../index.js');

describe('Double Validator', () => {
  it("Type", () => {
    let schema = iceworm.createFieldSchema("double");
    let v_double = iceworm.validators.double(13.5, schema);
    let v_int = iceworm.validators.double(8, schema);
    let v_bool = iceworm.validators.double(true, schema);
    let v_string = iceworm.validators.double("some string", schema);

    v_double.valid.should.equal(true);
    v_int.valid.should.equal(true);
    v_bool.valid.should.equal(false);
    v_string.valid.should.equal(false);
  });
  it('Required', () => {
    let schema = iceworm.createFieldSchema("*double");
    let validation = iceworm.validators.double(undefined, schema);
    validation.valid.should.equal(false);
    validation.errors.length.should.equal(1);
    validation.errors[0].reason.should.equal("required");
  });
  it("Min", () => {
    let schema = iceworm.createFieldSchema("double>10");
    let validation = iceworm.validators.double(9, schema);
    validation.valid.should.equal(false);
    validation.errors.length.should.equal(1);
    validation.errors[0].reason.should.equal("min");
  });
  it("Max", () => {
    let schema = iceworm.createFieldSchema("double<10");
    let validation = iceworm.validators.double(10, schema);
    validation.valid.should.equal(false);
    validation.errors.length.should.equal(1);
    validation.errors[0].reason.should.equal("max");
  });
});