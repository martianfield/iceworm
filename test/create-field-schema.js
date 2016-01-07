'use strict';
const _ = require('lodash');
const should = require('chai').should();
const expect = require('chai').expect;
const iceworm = require(__dirname + '/../index.js');

describe('Field Schema Creation', () => {
  describe('Isolated', () => {
    it('Type', () => {
      iceworm.createFieldSchema('string').type.should.equal('string');
      iceworm.createFieldSchema('STRING').type.should.equal('string');
    });
    it('Required', () => {
      iceworm.createFieldSchema('*type[]').required.should.equal(true);
      iceworm.createFieldSchema('type[]').required.should.equal(false);
    });
    it('Min Length', () => {
      expect(iceworm.createFieldSchema('type').min).to.be.undefined;
      iceworm.createFieldSchema('type>10').min.should.equal(10);
    });
    it('Max Length', () => {
      expect(iceworm.createFieldSchema('type').max).to.be.undefined;
      iceworm.createFieldSchema('type<10').max.should.equal(10);
    });
  });
  describe('Real Life', () => {
    it('Required string with min and max length', () => {
      var parsed = iceworm.createFieldSchema('*string>8<32');
      parsed.required.should.equal(true);
      parsed.min.should.equal(8);
      parsed.max.should.equal(32);
      parsed.type.should.equal('string');
    })
  });
});