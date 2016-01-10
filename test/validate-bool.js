'use strict';
const should = require('chai').should();
const expect = require('chai').expect;
const iceworm = require(__dirname + '/../index.js');
const FieldInfo = iceworm.FieldInfo;

describe('String Validator', () => {
  it('Required (undefined)', () => {
    let fieldInfo = FieldInfo.create('', "*bool");
    let validation = iceworm.validators.bool(undefined, fieldInfo);
    validation.valid.should.equal(false);
    validation.errors.length.should.equal(1);
    validation.errors[0].reason.should.equal("required");
  });
  it('Required (null)', () => {
    let fieldInfo = FieldInfo.create('', "*bool");
    let validation = iceworm.validators.bool(null, fieldInfo);
    validation.valid.should.equal(false);
    validation.errors.length.should.equal(1);
    validation.errors[0].reason.should.equal("required");
  });
});