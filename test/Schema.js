'use strict'

const should = require('chai').should()
const expect = require('chai').expect
const iceworm = require(__dirname + '/../index.js')
const Schema = iceworm.Schema
const cache = iceworm.cache

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

  it('Caching', () => {
    // Schemas are cached if a name is supplied as the second parameter in the Schema constructor or static create function.
    // Here we test if schemas are cached / not cached, depending on whether a name was given
    // arrange
    iceworm.Schema.purgeCache()
    let raw = { name: '*string'}
    // act
    let schema1 = Schema.create(raw, 'person')
    let schema2 = Schema.create(raw)
    // assert that schema1 is cached
    expect(iceworm.Schema.fromCache('person')).to.deep.equal(schema1)
    // assert that schema2 is NOT cached
    let schema2_cached = false
    for(let schema in iceworm.Schema.getCached()) {
      if(iceworm.Schema.getCached().hasOwnProperty(schema)) {
        if(iceworm.Schema.fromCache(schema) === schema2) {
          schema2_cached = true
        }
      }
    }
    expect(schema2_cached).to.equal(false)
  })
  
  it('Embedded Types', () => {
    // TODO implement
    // // arrange / act
    // let cat_schema = new Schema({ name: "*string"})
    // let owner = new Schema({ name: "*string", pet: "*cat"}, {cat:cat_schema})
    // // assert
    // let embedded_field = owner.field('pet')
    // expect(embedded_field.name).to.equal('pet')
    // expect(embedded_field.type).to.equal('cat')
    // expect(embedded_field.schema).to.equal(cat_schema)
  })
})