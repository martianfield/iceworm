'use strict';
const _ = require('lodash');
const should = require('chai').should();
const expect = require('chai').expect;
const iceworm = require(__dirname + '/../index.js');
const FieldInfo = iceworm.FieldInfo;

describe('E-Mail Validator', () => {

  it('Invalid Format (required)', () => {
    let fi = FieldInfo.create('', '*email');
    let emails = [
      'anne.com',
      'anne@com',
      '@anne.com'
    ];
    _.forEach(emails, (email) => {
      let result = fi.validate(email);
      result.valid.should.equal(false);
      result.errors.length.should.equal(1);
      result.errors[0].reason.should.equal('format');
    });
  });

  it('Invalid Format (not required)', () => {
    let fi = FieldInfo.create('', 'email');
    fi.validate(undefined).valid.should.equal(true);
    fi.validate(null).valid.should.equal(true);
    fi.validate('').valid.should.equal(false);
  })

});