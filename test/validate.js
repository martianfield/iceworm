'use strict';
const iceworm = require(__dirname + '/../index.js');
const should = require('chai').should();


describe("validate()", () => {
  it("Valid result", () => {
    // arrange
    let schema = iceworm.Schema.create({
      name:"*string",
      age:"int>0"
    });
    let obj = { name:"Amy Pond", age:24};
    // act
    let result = iceworm.validate(obj, schema);
    // assert
    result.valid.should.equal(true);
    result.errors.length.should.equal(0);
  })

  it("Invalid result", () => {
    // arrange
    let schema = iceworm.Schema.create({
      name:"*string",
      age:"int>20"
    });
    let obj = { age: 18};
    // act
    let result = iceworm.validate(obj, schema);
    // assert
    result.valid.should.equal(false);
    result.errors.length.should.equal(2);
  })

  it('Invalid result (field name in error)', () => {
    // arrange
    let schema = iceworm.Schema.create({
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
  })

  it('Array: not an array', () => {
    // arrange
    let schema = iceworm.Schema.create({
      title:'string',
      tags:'string[]'
    })
    let obj = { title: 'title', tags:10 }
    // act
    let result = iceworm.validate(obj, schema)
    // assert
    result.valid.should.equal(false)
    result.errors.length.should.equal(1)
    result.errors[0].field.should.equal('tags')
  })

  it('Array: not all items in array of correct type', () => {
    // arrange
    let schema = iceworm.Schema.create({
      city:'string',
      temperatures:'int[]'
    })
    let obj = { title: 'title', temperatures:[1, 2, 'not an int'] }
    // act
    let result = iceworm.validate(obj, schema)
    // assert
    result.valid.should.equal(false)
    result.errors.length.should.equal(1)
    result.errors[0].field.should.equal('temperatures')
    result.errors[0].errors.length.should.equal(1)
    result.errors[0].errors[0].reason.should.equal('type')
    // TODO should we not rather return a flat result?
  })
})