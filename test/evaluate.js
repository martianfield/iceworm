'use strict';

const should = require('chai').should();
const iceworm = require(__dirname + '/../index.js');

describe("Evaluating", () => {
  it("evaluate()", () => {
    // arrange
    let rawSchema = {
      name:'string',
      email:'email',
      age:'int',
      height:'float',
      scottish:'bool'
    };
    let obj = {
      name: 'Amy',
      email: 'amy@pond.com',
      age: 24,
      height: 1.71,
      scottish: true
    };
    // act
    let result = iceworm.evaluate(obj, rawSchema);
    // assert
    result.valid.should.equal(true);
    result.errors.length.should.equal(0);
    result.obj.name.should.equal(obj.name);
    result.obj.email.should.equal(obj.email);
    result.obj.age.should.equal(obj.age);
    result.obj.height.should.equal(obj.height);
    result.obj.scottish.should.equal(obj.scottish);
  })
});
