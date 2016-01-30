'use strict';
const should = require('chai').should();
const expect = require('chai').expect;
const iceworm = require(__dirname + '/../index.js');

describe("Projection", () => {

  describe("bool projection", () => {
    it("undefined / null", () => {
      // arrange / act
      let result_undefined = iceworm.projectors.bool(undefined);
      let result_null = iceworm.projectors.bool(null);
      // assert
      expect(result_undefined).to.equal(undefined);
      expect(result_null).to.equal(null);
    });
    it("from string", () => {
      // arrange / act
      let result_true = iceworm.projectors.bool("true");
      let result_false = iceworm.projectors.bool("false");
      let result_random = iceworm.projectors.bool("any type of text");
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
      let result_true = iceworm.projectors.bool(1);
      let result_false = iceworm.projectors.bool(0);
      // assert type
      expect(result_true).to.be.a('boolean');
      expect(result_false).to.be.a('boolean');
      // assert value
      result_true.should.equal(true);
      result_false.should.equal(false);
    });
  });

  describe("email projection", () => {
    it("from undefined / null", () => {
      expect(iceworm.projectors.email(undefined)).to.equal(undefined);
      expect(iceworm.projectors.email(null)).to.equal(null);
    });
    it("bool, number, etc", () => {
      expect(iceworm.projectors.email(true)).to.be.a('string');
      expect(iceworm.projectors.email(false)).to.be.a('string');
      expect(iceworm.projectors.email(12)).to.be.a('string');
      expect(iceworm.projectors.email(12.56)).to.be.a('string');
    });
  });

  describe("float projection", () => {
    it("undefined / null", () => {
      expect(iceworm.projectors.float(undefined)).to.equal(undefined);
      expect(iceworm.projectors.float(null)).to.equal(null);
    });
    it("NaN", () => {
      expect(iceworm.projectors.float("something")).to.equal(undefined);
    });
    it("a number", () => {
      let result = iceworm.projectors.float(1);
      result.should.equal(1);
      expect(result).to.be.a('number');
    });
    it("a numeric string", () => {
      let result = iceworm.projectors.float("1.8");
      result.should.equal(1.8);
      expect(result).to.be.a('number');
    });
  });

  describe("int projection", () => {
    it("undefined / null", () => {
      expect(iceworm.projectors.int(undefined)).to.equal(undefined);
      expect(iceworm.projectors.int(null)).to.equal(null);
    });
    it("NaN", () => {
      expect(iceworm.projectors.int("something")).to.equal(undefined);
    });
    it("a number", () => {
      let result = iceworm.projectors.int(1.8);
      result.should.equal(1);
      expect(result).to.be.a('number');
    });
    it("a numeric string", () => {
      let result = iceworm.projectors.int("1.8");
      result.should.equal(1);
      expect(result).to.be.a('number');
    });
  });

  describe("string projection", () => {
    it("from undefined / null", () => {
      // arrange / act
      let result_undefined = iceworm.projectors.string(undefined);
      let result_null = iceworm.projectors.string(null);
      // assert
      expect(result_undefined).to.equal(undefined);
      expect(result_null).to.equal(null);
    });
    it("from number", () => {
      // arrange / act
      let result = iceworm.projectors.string(1);
      // assert
      expect(result).to.be.a('string');
    });
    it("from bool", () => {
      // arrange, act
      let result_true = iceworm.projectors.string(true);
      let result_false = iceworm.projectors.string(false);
      // assert
      expect(result_true).to.be.a('string');
      expect(result_false).to.be.a('string');
      result_true.should.equal('true');
      result_false.should.equal('false');
    });
  });

  it("project()",  () => {
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
    let projected = iceworm.project(obj, docSchema);
    // assert
    projected.name.should.equal(obj.name);
    projected.email.should.equal(obj.email);
    projected.age.should.equal(obj.age);
    projected.height.should.equal(obj.height);
    projected.scottish.should.equal(obj.scottish);
  })

  it("project() with hidden fields", () => {
    // arrange
    let schema = iceworm.Schema.create({
      name:'string',
      age:'-int'
    })
    let obj = {
      name:'Amy',
      age: 24
    }
    // act
    let projected = iceworm.project(obj, schema)
    // assert
    projected.hasOwnProperty('age').should.equal(false)
  })

  it("project() with array", () => {
    // arrange
    let schema = iceworm.Schema.create({
      name:'string',
      grades:'int[]'
    })
    let obj = {
      name: 'Amy',
      grades: [1, 2, 4, 8, 16]
    }
    // act
    let projected = iceworm.project(obj, schema)
    projected.grades.should.deep.equal([1, 2, 4, 8, 16])
  })

})
