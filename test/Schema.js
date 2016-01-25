'use strict';
const should = require('chai').should();
const expect = require('chai').expect;
const iceworm = require(__dirname + '/../index.js');
const Schema = iceworm.Schema;

describe('Schema', () => {
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