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
    fieldCount.should.equal(3)
  })

  /*
  it('Options', () => {
    // arrange
    let raw = { name: '*string' }
    let collection = 'companions'
    // act
    let schema = Schema.create(raw, collection)
    // assert
    schema.collection.should.equal('companions')

  })
  */
})