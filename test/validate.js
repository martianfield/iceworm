'use strict';
const iceworm = require(__dirname + '/../index.js');
const should = require('chai').should();


describe("validate()", () => {
  it("A", () => {
    // arrange
    let schema = iceworm.createDocumentSchema({
      name:"*string",
      age:"int>0"
    });
    let obj = { name:"Amy Pond", age:24};
    // act
    let result = iceworm.validate(schema, obj);
    // assert
    result.valid.should.equal(true);
    result.errors.length.should.equal(0);
  });

  it("B", () => {
    // arrange
    let schema = iceworm.createDocumentSchema({
      name:"*string",
      age:"int>20"
    })
    let obj = { age: 18};
    // act
    let result = iceworm.validate(schema, obj);
    // assert
    result.valid.should.equal(false);
    result.errors.length.should.equal(2);
  });
});