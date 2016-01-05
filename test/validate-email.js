'use strict';
const _ = require('lodash');
const should = require('chai').should();
const expect = require('chai').expect;
const iceworm = require(__dirname + '/../index.js');

describe('E-Mail Validator', () => {

  it('Invalid Format (required)', () => {
    let schema = iceworm.createFieldSchema('*email');
    let emails = [
      'anne.com',
      'anne@com',
      '@anne.com'
    ];
    _.forEach(emails, (email) => {
      let result = iceworm.validators.email(email, schema);
      result.valid.should.equal(false);
      result.errors.length.should.equal(1);
      result.errors[0].reason.should.equal('format');
    });
  });

  it('Invalid Format (not required)', () => {
    let schema = iceworm.createFieldSchema('email');
    iceworm.validators.email(undefined, schema).valid.should.equal(true);
    iceworm.validators.email(null, schema).valid.should.equal(true);
    iceworm.validators.email('', schema).valid.should.equal(false);
  })

});