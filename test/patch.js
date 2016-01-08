'use strict';

const should = require('chai').should();
const expect = require('chai').expect;
const iceworm = require(__dirname + '/../index.js');

describe("Patching", () => {

  describe("string patching", () => {
    it("from undefined / null", () => {
      // arrange / act
      let result_undefined = iceworm.patchers.string(undefined);
      let result_null = iceworm.patchers.string(null);
      // assert
      expect(result_undefined).to.be.a('string');
      result_undefined.should.equal('');
      expect(result_null).to.be.a('string');
      result_null.should.equal('');
    })
    it("from number", () => {
      // arrange / act
      let result = iceworm.patchers.string(1);
      // assert
      expect(result).to.be.a('string');
    });
    it("from bool", () => {
      // arrange, act
      let result_true = iceworm.patchers.string(true);
      let result_false = iceworm.patchers.string(false);
      // assert
      expect(result_true).to.be.a('string');
      expect(result_false).to.be.a('string');
      result_true.should.equal('true');
      result_false.should.equal('false');
    });
  });

  describe("bool patching", () => {
    it("undefined / null", () => {
      // arrange / act
      let result_undefined = iceworm.patch.bool(undefined);
      let result_null = iceworm.patch.bool(null);
      // assert
      result_undefined.should.equal(false);
      result_null.should.equal(false);
    })
  })
})
