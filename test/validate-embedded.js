'use strict'
const should = require('chai').should()
const expect = require('chai').expect
const iceworm = require(__dirname + '/../index.js')
const Schema = iceworm.Schema
const FieldInfo = iceworm.FieldInfo

describe("Embedded Document Validation", () => {

  it("required embedded", () => {
    let horse = new Schema(
      {
        name: "*string"
      }
    )
    iceworm.extend("horse", horse)

    let rider = new Schema(
      {
        name: "*string",
        horse: "*horse"
      },
      {
        horse: horse
      }

    )
    //rider.embed('horse', horse)
  })
})