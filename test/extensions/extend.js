'use strict';

const should = require('chai').should();
const iceworm = require(__dirname + '/../../index.js');

describe('Extensions', () => {
  it('extend()', () => {
    // arrange
    var extension = require(__dirname + '/extension_1.js');
    var schema = {thing:"ext.thing"}
    var obj1 = {thing:"a thing"};
    var obj2 = {thing:"not a thing"};
    // act
    iceworm.extend("ext", extension);
    let result1 = iceworm.evaluate(obj1, schema);
    let result2 = iceworm.evaluate(obj2, schema);
    // assert
    result1.valid.should.equal(true);
    result2.valid.should.equal(false);
  })
});