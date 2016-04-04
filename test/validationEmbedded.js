'use strict'

const iceworm = require(__dirname + '/../index.js')
const should = require('chai').should()
const expect = require('chai').expect


describe("Embedded Types Validation", () => {
  /**
   * if an embedded type is marked as required, validation should check if the object
   * that is validated contains the required embedded document
   */
  it("Required", () => {
    // arrange
    let book = iceworm.Schema.create({title:'*string'}, 'book')
    let author = iceworm.Schema.create({name:'*string', book:'*book'}, 'author')
    let obj_valid = {name:'Charles Dickens', book:{title:'Great Expectations'}}
    let obj_invalid = {name:'Charles Dickens'}
    // act
    let result_valid = iceworm.validate(obj_valid, author)
    let result_invalid = iceworm.validate(obj_invalid, author)
    // assert
    expect(result_valid.valid).to.equal(true)
    expect(result_invalid.valid).to.equal(false)
  })

  it("Embedded Has Required", () => {
    // arrange
    iceworm.Schema.create({a:'*string'}, 'inner')
    iceworm.Schema.create({a:'string', b:'*inner'}, 'outer')
    let inner = iceworm.Schema.fromCache('inner')
    let outer = iceworm.Schema.fromCache('outer')
    let obj_valid = {a:'a', b:{a:'a'}}
    let obj_invalid = {a:'a', b:{}}
    // act
    let result_valid = outer.validate(obj_valid)
    let result_invalid = outer.validate(obj_invalid)
    // assert
    expect(result_valid.valid).to.equal(true)
    expect(result_invalid.valid).to.equal(false)
  })
  
  it("Array of Embedded Type", () => {
    // arrange
    iceworm.Schema.create({a:'*string'}, 'inner')
    iceworm.Schema.create({a:'string', b:'*inner[]'}, 'outer_array')
    let inner = iceworm.Schema.fromCache('inner')
    let outer_array = iceworm.Schema.fromCache('outer_array')
    let obj_valid = {a:'a', b:[{a:'a'},{a:'b'}]}
    let obj_invalid = {a:'a', b:[{something:'a'},{a:'b'}]}
    // act
    let result_valid = outer_array.validate(obj_valid)
    let result_invalid = outer_array.validate(obj_invalid)
    // assert
    expect(result_valid.valid).to.equal(true)
    expect(result_invalid.valid).to.equal(false)
  })
})

// TODO if the inner type is not cached (e.g. not yet created, no name given) when the outer is created, we run into issues ... need to handle this gracefully

/*
 // arrange: create a schema to embed, and a schema having the embedded schema
 let animalSchema = iceworm.Schema.create({name: '*string'}, 'animal')
 let ownerSchema = iceworm.Schema.create({name: '*string', pet: '*animal'})
 // act
 let obj_valid = {name:'Marie', pet:{name:'Lamb'}}
 let obj_invalid_1 = {name:'Marie'}
 let obj_invalid_2 = {name:'Marie', pet:{age:4}}
 let validation_valid = iceworm.validate(obj_valid, ownerSchema)
 let validation_invalid_1 = iceworm.validate(obj_invalid_1, ownerSchema)
 let validation_invalid_2 = iceworm.validate(obj_invalid_2, ownerSchema)
 // assert
 validation_valid.valid.should.equal(true)
 */