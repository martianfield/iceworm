'use strict';
const should = require('chai').should();
const expect = require('chai').expect;
const iceworm = require(__dirname + '/../index.js');

describe("Patching", () => {

  describe("bool patching", () => {
    it("undefined / null", () => {
      // arrange / act
      let result_undefined = iceworm.patchers.bool(undefined);
      let result_null = iceworm.patchers.bool(null);
      // assert
      expect(result_undefined).to.equal(undefined);
      expect(result_null).to.equal(null);
    });
    it("from string", () => {
      // arrange / act
      let result_true = iceworm.patchers.bool("true");
      let result_false = iceworm.patchers.bool("false");
      let result_random = iceworm.patchers.bool("any type of text");
      // assert type
      expect(result_true).to.be.a('boolean');
      expect(result_false).to.be.a('boolean');
      expect(result_random).to.be.a('boolean');
      // assert value
      result_true.should.equal(true);
      result_false.should.equal(false);
      result_random.should.equal(true);
    });
    it("from number", () => {
      // arrange / act
      let result_true = iceworm.patchers.bool(1);
      let result_false = iceworm.patchers.bool(0);
      // assert type
      expect(result_true).to.be.a('boolean');
      expect(result_false).to.be.a('boolean');
      // assert value
      result_true.should.equal(true);
      result_false.should.equal(false);
    });
  });

  describe("email patching", () => {
    it("from undefined / null", () => {
      expect(iceworm.patchers.email(undefined)).to.equal(undefined);
      expect(iceworm.patchers.email(null)).to.equal(null);
    });
    it("bool, number, etc", () => {
      expect(iceworm.patchers.email(true)).to.be.a('string');
      expect(iceworm.patchers.email(false)).to.be.a('string');
      expect(iceworm.patchers.email(12)).to.be.a('string');
      expect(iceworm.patchers.email(12.56)).to.be.a('string');
    });
  });

  describe("float patching", () => {
    it("undefined / null", () => {
      expect(iceworm.patchers.float(undefined)).to.equal(undefined);
      expect(iceworm.patchers.float(null)).to.equal(null);
    });
    it("NaN", () => {
      expect(iceworm.patchers.float("something")).to.equal(undefined);
    });
    it("a number", () => {
      let result = iceworm.patchers.float(1);
      result.should.equal(1);
      expect(result).to.be.a('number');
    });
    it("a numeric string", () => {
      let result = iceworm.patchers.float("1.8");
      result.should.equal(1.8);
      expect(result).to.be.a('number');
    });
  });

  describe("int patching", () => {
    it("undefined / null", () => {
      expect(iceworm.patchers.int(undefined)).to.equal(undefined);
      expect(iceworm.patchers.int(null)).to.equal(null);
    });
    it("NaN", () => {
      expect(iceworm.patchers.int("something")).to.equal(undefined);
    });
    it("a number", () => {
      let result = iceworm.patchers.int(1.8);
      result.should.equal(1);
      expect(result).to.be.a('number');
    });
    it("a numeric string", () => {
      let result = iceworm.patchers.int("1.8");
      result.should.equal(1);
      expect(result).to.be.a('number');
    });
  });

  describe("string patching", () => {
    it("from undefined / null", () => {
      // arrange / act
      let result_undefined = iceworm.patchers.string(undefined);
      let result_null = iceworm.patchers.string(null);
      // assert
      expect(result_undefined).to.equal(undefined);
      expect(result_null).to.equal(null);
    });
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

  it("patch()",  () => {
    // arrange
    let docSchema = iceworm.Schema.create({
      name:'string',
      email:'email',
      age:'int',
      height:'float',
      scottish:'bool'
    });
    let obj = {
      name: 'Amy',
      email: 'amy@pond.com',
      age: 24,
      height: 1.71,
      scottish: true
    }
    // act
    let patched = iceworm.patch(obj, docSchema);
    // assert
    patched.name.should.equal(obj.name);
    patched.email.should.equal(obj.email);
    patched.age.should.equal(obj.age);
    patched.height.should.equal(obj.height);
    patched.scottish.should.equal(obj.scottish);
  })

})
