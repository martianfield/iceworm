'use strict';
const iceworm = require(__dirname + '/../index.js');
const should = require('chai').should();


describe("validate()", () => {
  it("Valid result", () => {
    // arrange
    let schema = iceworm.createDocumentSchema({
      name:"*string",
      age:"int>0"
    });
    let obj = { name:"Amy Pond", age:24};
    // act
    let result = iceworm.validate(obj, schema);
    // assert
    result.valid.should.equal(true);
    result.errors.length.should.equal(0);
  });

  it("Invalid result", () => {
    // arrange
    let schema = iceworm.createDocumentSchema({
      name:"*string",
      age:"int>20"
    });
    let obj = { age: 18};
    // act
    let result = iceworm.validate(obj, schema);
    // assert
    result.valid.should.equal(false);
    result.errors.length.should.equal(2);
  });

  it('Invalid result (field name in error)', () => {
    // arrange
    let schema = iceworm.createDocumentSchema({
      name:'*string',
      age:'int>20'
    });
    let obj = { name: "Amy", age:18 }; // field 'age' is not valid
    // act
    let result = iceworm.validate(obj, schema);
    // assert
    result.valid.should.equal(false);
    result.errors.length.should.equal(1);
    result.errors[0].field.should.equal('age');
  });
});