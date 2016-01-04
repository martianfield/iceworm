'use strict';
const _ = require('lodash');
const should = require('chai').should();
const expect = require('chai').expect;
const iceworm = require(__dirname + '/../index.js');

describe('Definition Parser', () => {
  describe('Isolated', () => {
    it('Type', () => {
      iceworm.parseDefinition('string').type.should.equal('string');
      iceworm.parseDefinition('STRING').type.should.equal('string');
    });
    it('Required', () => {
      iceworm.parseDefinition('*type[]').required.should.equal(true);
      iceworm.parseDefinition('type[]').required.should.equal(false);
    });
    it('Min Length', () => {
      expect(iceworm.parseDefinition('type').min).to.be.undefined;
      iceworm.parseDefinition('type>10').min.should.equal(10);
    });
    it('Max Length', () => {
      expect(iceworm.parseDefinition('type').max).to.be.undefined;
      iceworm.parseDefinition('type<10').max.should.equal(10);
    });
  });
  describe('Real Life', () => {
    it('Required string with min and max length', () => {
      var parsed = iceworm.parseDefinition('*string>8<32');
      parsed.required.should.equal(true);
      parsed.min.should.equal(8);
      parsed.max.should.equal(32);
      parsed.type.should.equal('string');
    })
  });
});