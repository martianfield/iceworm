'use strict'

const should = require('chai').should();

describe('One', () => {
	it(('1a'), () => {
		// arrange
		let num = 1;
		// act
		let numx2 = num * 2;
		// assert
		numx2.should.equal(2);
	})
})