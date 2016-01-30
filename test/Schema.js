'use strict'

const should = require('chai').should()
const expect = require('chai').expect
const iceworm = require(__dirname + '/../index.js')
const Schema = iceworm.Schema

describe('Schema', () => {
  it('Schema.create() vs new Schema()', () => {
    let raw = {
      name:'*string>10',
      age:'int',
      married:'bool'
    }
    let schema1 = Schema.create(raw)
    let schema2 = new Schema(raw)
    schema1.should.deep.equal(schema2)
  })

  it('Fields count', () => {
    let raw = {
      name:'*string>10',
      age:'int',
      married:'bool'
    }
    let schema = Schema.create(raw)
    schema.fields.length.should.equal(3)
  })

  it(('Field name'), () => {
    let raw = {
      name:'*string>10',
      age:'int',
      married:'bool'
    }
    let schema = Schema.create(raw)
    expect(schema.field('name').name).to.equal('name')
    expect(schema.field('age').name).to.equal('age')
    expect(schema.field('married').name).to.equal('married')
    expect(schema.field('does-not-exist')).to.equal(undefined)
  })

  it('Options', () => {
    // arrange
    let raw = { name: '*string' }
    let options = {
      collection: 'companions',
      names: [
        'Amy',
        'Rose',
        'Donna'
      ]
    }
    // act
    let schema = Schema.create(raw, options)
    // assert
    schema.options.should.deep.equal(options)

  })
})