'use strict';
const should = require('chai').should();
const expect = require('chai').expect;
const iceworm = require(__dirname + '/../index.js');
const Schema = iceworm.Schema;

describe('Document Schema Creation', () => {
  it('Fields count', () => {
    let raw = {
      name:'*string>10',
      age:'int',
      married:'bool'
    }
    let schema = Schema.create(raw)
    let fieldCount = 0;
    for(let field in schema.fields) {
      if(schema.fields.hasOwnProperty(field)) {
        fieldCount += 1;
      }
    }
    expect(schema.fields['name'].name).to.equal('name')
    expect(schema.fields['age'].name).to.equal('age')
    expect(schema.fields['married'].name).to.equal('married')
    fieldCount.should.equal(3)
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