'use strict';
const should = require('chai').should();
const expect = require('chai').expect;
const iceworm = require(__dirname + '/../index.js');
const FieldInfo = iceworm.FieldInfo;

describe('Float Validator', () => {
  it("Type", () => {
    let schema = FieldInfo.create('', "float");
    let v_float = iceworm.validators.float(13.5, schema);
    let v_int = iceworm.validators.float(8, schema);
    let v_bool = iceworm.validators.float(true, schema);
    let v_string = iceworm.validators.float("some string", schema);

    v_float.valid.should.equal(true);
    v_int.valid.should.equal(true);
    v_bool.valid.should.equal(false);
    v_string.valid.should.equal(false);
  });
  it('Required', () => {
    let schema = FieldInfo.create('', "*float");
    let validation = iceworm.validators.float(undefined, schema);
    validation.valid.should.equal(false);
    validation.errors.length.should.equal(1);
    validation.errors[0].reason.should.equal("required");
  });
  it("Min", () => {
    let schema = FieldInfo.create('', "float>10");
    let validation = iceworm.validators.float(9, schema);
    validation.valid.should.equal(false);
    validation.errors.length.should.equal(1);
    validation.errors[0].reason.should.equal("min");
  });
  it("Max", () => {
    let schema = FieldInfo.create('', "float<10");
    let validation = iceworm.validators.float(10, schema);
    validation.valid.should.equal(false);
    validation.errors.length.should.equal(1);
    validation.errors[0].reason.should.equal("max");
  });
});