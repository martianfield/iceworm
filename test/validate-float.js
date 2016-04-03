'use strict';
const should = require('chai').should();
const expect = require('chai').expect;
const iceworm = require(__dirname + '/../index.js');
const FieldInfo = iceworm.FieldInfo;

describe('Float Validator', () => {
  it("Type", () => {
    let fi = FieldInfo.create('', "float");
    let v_float = fi.validate(13.5)
    let v_int = fi.validate(8)
    let v_bool = fi.validate(true)
    let v_string = fi.validate("some string")

    v_float.valid.should.equal(true);
    v_int.valid.should.equal(true);
    v_bool.valid.should.equal(false);
    v_string.valid.should.equal(false);
  })

  it("Type from numeric string", () => {
    let fi = FieldInfo.create('', "float")
    let result_from_string = fi.validate("12.5")
    result_from_string.valid.should.equal(true)
  })

  it('Required', () => {
    let fi = FieldInfo.create('', "*float");
    let result = fi.validate(undefined)
    result.valid.should.equal(false);
    result.errors.length.should.equal(1);
    result.errors[0].reason.should.equal("required");
  })

  it("Min", () => {
    let fi = FieldInfo.create('', "float>10")
    let result = fi.validate(9)
    result.valid.should.equal(false)
    result.errors.length.should.equal(1)
    result.errors[0].reason.should.equal("min")
  })

  it("Min (no value provided)", () => {
    let fi = FieldInfo.create('', "float>10")
    let result = fi.validate(undefined)
    result.valid.should.equal(true)
  })

  it("Max", () => {
    let fi = FieldInfo.create('', "float<10")
    let result = fi.validate(10)
    result.valid.should.equal(false)
    result.errors.length.should.equal(1)
    result.errors[0].reason.should.equal("max")
  })

  it("Max (no value provided)", () => {
    let fi = FieldInfo.create('', "float<10")
    let result = fi.validate(undefined)
    result.valid.should.equal(true)
  })

})