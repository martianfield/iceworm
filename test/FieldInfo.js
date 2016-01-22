'use strict';

const should = require('chai').should();
const expect = require('chai').expect;
const FieldInfo = require(__dirname + '/../src/FieldInfo');


describe("FieldInfo", () => {
  let fi

  describe("create()", () => {
    it('Type', () => {
      FieldInfo.create('name', 'string').type.should.equal('string');
      FieldInfo.create('name', 'STRING').type.should.equal('string');
    })

    it('Type with namespace', () => {
      let s_without_ns = FieldInfo.create('', 'string');
      let s_with_ns = FieldInfo.create('', 'something.string');
      expect(s_without_ns.namespace).to.equal(undefined);
      s_without_ns.type.should.equal('string');
      expect(s_with_ns.namespace).to.equal('something');
      s_with_ns.type.should.equal('string');
    })

    it('Required', () => {
      FieldInfo.create('', '*type[]').required.should.equal(true);
      FieldInfo.create('', 'type[]').required.should.equal(false);
    })

    it('Hidden', () => {
      let visible = FieldInfo.create('', 'string');
      visible.hidden.should.equal(false);
      let hidden = FieldInfo.create('', '-string');
      hidden.hidden.should.equal(true);
      let hidden_required = FieldInfo.create('', '-*string');
      hidden_required.hidden.should.equal(true);
      hidden_required.required.should.equal(true);
      let required_hidden = FieldInfo.create('', '*-string');
      required_hidden.hidden.should.equal(true);
      required_hidden.required.should.equal(true);

    })

    it('array', () => {
      fi = FieldInfo.create('', 'string')
      expect(fi).to.have.property('array', false)

      fi = FieldInfo.create('', 'string[]')
      expect(fi).to.have.property('type', 'string')
      expect(fi).to.have.property('array', true)

      fi = FieldInfo.create('', 'string[]>10')
      expect(fi).to.have.property('type', 'string')
      expect(fi).to.have.property('array', true)
      expect(fi).to.have.property('min', 10)

    })

    it('Min Length', () => {
      fi = FieldInfo.create('', 'string')
      expect(fi.min).to.be.undefined
      expect(fi).to.have.property('type', 'string')

      fi = FieldInfo.create('', 'string>10')
      expect(fi).to.have.property('min', 10)
      expect(fi).to.have.property('type', 'string')

    })

    it('Max Length', () => {
      expect(FieldInfo.create('', 'type').max).to.be.undefined;
      FieldInfo.create('', 'type<10').max.should.equal(10);
    })
  })
})