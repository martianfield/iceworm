'use strict'

const should = require('chai').should()
const expect = require('chai').expect
const iceworm = require(__dirname + '/../index.js')
const FieldInfo = iceworm.FieldInfo

describe('Int Validator', () => {
  it("Type", () => {
    let fi = FieldInfo.create('test', "int")
    let v_int = fi.validate(8)
    let v_double = fi.validate(13.5)
    let v_bool = fi.validate(true)
    let v_string = fi.validate("some string")

    v_int.valid.should.equal(true, 'v_int')
    v_double.valid.should.equal(false, 'v_double')
    v_bool.valid.should.equal(false, 'v_bool')
    v_string.valid.should.equal(false, 'v_string')

  })

  it("Type from numeric string", () => {
    let fi = FieldInfo.create('test', "int")
    let v_from_string = fi.validate('12')
    v_from_string.valid.should.equal(true)
  })

  it('Required', () => {
    let fi = FieldInfo.create('test', "*int")
    let validation = fi.validate(undefined)
    validation.valid.should.equal(false)
    validation.errors.length.should.equal(1)
    validation.errors[0].reason.should.equal("required")
  })

  it("Min", () => {
    let fi = FieldInfo.create('test', "int>10")
    let validation = fi.validate(9)
    validation.valid.should.equal(false)
    validation.errors.length.should.equal(1)
    validation.errors[0].reason.should.equal("min")
  })

  it("Min (value NOT provided, but not required", () => {
    let fi = FieldInfo.create('test', "int>10")
    let validation = fi.validate(undefined)
    validation.valid.should.equal(true)
  })

  it("Max", () => {
    let fi = FieldInfo.create('test', "int<10")
    let validation = fi.validate(10)
    validation.valid.should.equal(false)
    validation.errors.length.should.equal(1)
    validation.errors[0].reason.should.equal("max")
  })

  it("Max (value NOT provided, but not required", () => {
    let fi = FieldInfo.create('test', "int<10")
    let validation = fi.validate(undefined)
    validation.valid.should.equal(true)
  })
})