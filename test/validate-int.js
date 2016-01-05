'use strict';
const should = require('chai').should();
const expect = require('chai').expect;
const iceworm = require(__dirname + '/../index.js');

describe('Int Validator', () => {
  it("Type", () => {
    let schema = iceworm.createFieldSchema("int");
    let v_int = iceworm.validators.int(8, schema);
    let v_double = iceworm.validators.int(13.5, schema);
    let v_bool = iceworm.validators.int(true, schema);
    let v_string = iceworm.validators.int("some string", schema);

    v_int.valid.should.equal(true);
    v_double.valid.should.equal(false);
    v_bool.valid.should.equal(false);
    v_string.valid.should.equal(false);
  });
  it('Required', () => {
    let schema = iceworm.createFieldSchema("*int");
    let validation = iceworm.validators.int(undefined, schema);
    validation.valid.should.equal(false);
    validation.errors.length.should.equal(1);
    validation.errors[0].reason.should.equal("required");
  });
  it("Min", () => {
    let schema = iceworm.createFieldSchema("int>10");
    let validation = iceworm.validators.int(9, schema);
    validation.valid.should.equal(false);
    validation.errors.length.should.equal(1);
    validation.errors[0].reason.should.equal("min");
  });
  it("Max", () => {
    let schema = iceworm.createFieldSchema("int<10");
    let validation = iceworm.validators.int(10, schema);
    validation.valid.should.equal(false);
    validation.errors.length.should.equal(1);
    validation.errors[0].reason.should.equal("max");
  });
});