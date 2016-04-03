'use strict'

const should = require('chai').should()
const expect = require('chai').expect
const iceworm = require(__dirname + '/../index.js')
const FieldInfo = iceworm.FieldInfo

describe('String Validator', () => {
  it('Required', () => {
    // arrange
    let fi = FieldInfo.create('test', "*string")
    // act
    let validation = fi.validate(undefined)
    // assert
    validation.valid.should.equal(false)
    validation.errors.length.should.equal(1)
    validation.errors[0].reason.should.equal("required")
  })

  it("Min length", () => {
    // arrange
    let fi = FieldInfo.create('test', "string>3")
    // act
    let validation = fi.validate("abc")
    // assert
    validation.valid.should.equal(false)
    validation.errors.length.should.equal(1)
    validation.errors[0].reason.should.equal("min")
  })

  it("Max Length", () => {
    // arrange
    let fi = FieldInfo.create('test', "string<3")
    // act
    let validation = fi.validate("abc")
    // assert
    validation.valid.should.equal(false)
    validation.errors.length.should.equal(1)
    validation.errors[0].reason.should.equal("max")
  })
})