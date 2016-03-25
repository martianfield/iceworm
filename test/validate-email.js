'use strict';
const _ = require('lodash');
const should = require('chai').should();
const expect = require('chai').expect;
const iceworm = require(__dirname + '/../index.js');
const FieldInfo = iceworm.FieldInfo;

describe('E-Mail Validator', () => {

  it('Invalid Format (required)', () => {
    let schema = FieldInfo.create('', '*email');
    let emails = [
      'anne.com',
      'anne@com',
      '@anne.com'
    ];
    _.forEach(emails, (email) => {
      let result = iceworm.validators.get('email')(email, schema);
      result.valid.should.equal(false);
      result.errors.length.should.equal(1);
      result.errors[0].reason.should.equal('format');
    });
  });

  it('Invalid Format (not required)', () => {
    let schema = FieldInfo.create('', 'email');
    iceworm.validators.get('email')(undefined, schema).valid.should.equal(true);
    iceworm.validators.get('email')(null, schema).valid.should.equal(true);
    iceworm.validators.get('email')('', schema).valid.should.equal(false);
  })

});