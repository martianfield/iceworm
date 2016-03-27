'use strict';
const should = require('chai').should();
const expect = require('chai').expect;
const iceworm = require(__dirname + '/../index.js');
const FieldInfo = iceworm.FieldInfo;

describe('Array Validator', () => {
  it('Required', () => {
    let fieldInfo = FieldInfo.create('', '*int[]')
    let v1 = fieldInfo.validate(undefined, fieldInfo)
    v1.valid.should.equal(false)
    v1.errors.length.should.equal(1)
    v1.errors[0].reason.should.equal('required')
    let v2 = fieldInfo.validate(null, fieldInfo)
    v2.valid.should.equal(false)
    v2.errors.length.should.equal(1)
    v2.errors[0].reason.should.equal('required')
  })

  it('Not An Array', () => {
    let fieldInfo = FieldInfo.create('', "bool[]")
    let validation = fieldInfo.validate('not an array', fieldInfo)
    validation.valid.should.equal(false)
    validation.errors.length.should.equal(1)
    validation.errors[0].reason.should.equal("type")
  })

  it('Items not correct type', () => {
    let fieldInfo = FieldInfo.create('', "int[]")
    let validation = fieldInfo.validate([1, 2, "not a number"], fieldInfo)
    validation.valid.should.equal(false)
    validation.errors.length.should.equal(1)
    validation.errors[0].reason.should.equal("type")
  })

  it('All good', () => {
    let fieldInfo = FieldInfo.create('', "int[]")
    let validation = fieldInfo.validate([1, 2, 3], fieldInfo)
    validation.valid.should.equal(true)
  })


})