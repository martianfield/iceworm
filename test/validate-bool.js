'use strict';
const should = require('chai').should();
const expect = require('chai').expect;
const iceworm = require(__dirname + '/../index.js');
const FieldInfo = iceworm.FieldInfo;

describe('Bool Validator', () => {
  it('Required (undefined)', () => {
    let fieldInfo = FieldInfo.create('', "*bool")
    let result = fieldInfo.validate(undefined)
    result.valid.should.equal(false)
    result.errors.length.should.equal(1)
    result.errors[0].reason.should.equal("required")
  })

  it('Required (null)', () => {
    let fieldInfo = FieldInfo.create('', "*bool")
    let result = fieldInfo.validate(null)
    result.valid.should.equal(false)
    result.errors.length.should.equal(1)
    result.errors[0].reason.should.equal("required")
  })
})