'use strict';
const should = require('chai').should();
const expect = require('chai').expect;
const iceworm = require(__dirname + '/../index.js');
const FieldInfo = iceworm.FieldInfo;

describe('Int Validator', () => {
  it("Type", () => {
    let schema = FieldInfo.create('test', "int")
    let v_int = iceworm.validators.get('int')(8, schema)
    let v_double = iceworm.validators.get('int')(13.5, schema)
    let v_bool = iceworm.validators.get('int')(true, schema)
    let v_string = iceworm.validators.get('int')("some string", schema)

    v_int.valid.should.equal(true, 'v_int')
    v_double.valid.should.equal(false, 'v_double')
    v_bool.valid.should.equal(false, 'v_bool')
    v_string.valid.should.equal(false, 'v_string')

  })

  it("Type from numeric string", () => {
    let schema = FieldInfo.create('test', "int")
    let v_from_string = iceworm.validators.get('int')('12', schema)
    v_from_string.valid.should.equal(true)
  })

  it('Required', () => {
    let schema = FieldInfo.create('test', "*int");
    let validation = iceworm.validators.get('int')(undefined, schema);
    validation.valid.should.equal(false);
    validation.errors.length.should.equal(1);
    validation.errors[0].reason.should.equal("required");
  })

  it("Min", () => {
    let schema = FieldInfo.create('test', "int>10")
    let validation = iceworm.validators.get('int')(9, schema)
    validation.valid.should.equal(false)
    validation.errors.length.should.equal(1)
    validation.errors[0].reason.should.equal("min")
  })

  it("Min (value NOT provided, but not required", () => {
    let schema = FieldInfo.create('test', "int>10");
    let validation = iceworm.validators.get('int')(undefined, schema)
    validation.valid.should.equal(true)
  })

  it("Max", () => {
    let schema = FieldInfo.create('test', "int<10");
    let validation = iceworm.validators.get('int')(10, schema);
    validation.valid.should.equal(false);
    validation.errors.length.should.equal(1);
    validation.errors[0].reason.should.equal("max");
  })

  it("Max (value NOT provided, but not required", () => {
    let schema = FieldInfo.create('test', "int<10");
    let validation = iceworm.validators.get('int')(undefined, schema)
    validation.valid.should.equal(true)
  })
})