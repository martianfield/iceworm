'use strict'

const iceworm = require(__dirname + '/../index.js')
const should = require('chai').should()
const expect = require('chai').expect

before(() => {
  iceworm.Schema.create({a:'*string'}, 'inner')
  iceworm.Schema.create({a:'string', b:'*inner'}, 'outer')
})

describe("Embedded Types Validation", () => {
  it("Required", () => {
    // arrange
    let inner = iceworm.Schema.fromCache('inner')
    let outer = iceworm.Schema.fromCache('outer')
    let obj_valid = {a:'a', b:{a:'a'}}
    let obj_invalid = {a:'a'}
    // act
    let result_valid = iceworm.validate(obj_valid, outer)
    let result_invalid = iceworm.validate(obj_invalid, outer)
    // assert
    expect(result_valid.valid).to.equal(true)
    expect(result_invalid.valid).to.equal(false)
  })

  it("Embedded Has Required", () => {
    // arrange
    let inner = iceworm.Schema.fromCache('inner')
    let outer = iceworm.Schema.fromCache('outer')
    let obj_valid = {a:'a', b:{a:'a'}}
    let obj_invalid = {a:'a', b:{}}
    // act
    let result_valid = iceworm.validate(obj_valid, outer)
    let result_invalid = iceworm.validate(obj_invalid, outer)
    // assert
    expect(result_valid.valid).to.equal(true)
    expect(result_invalid.valid).to.equal(false)
  })
})



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