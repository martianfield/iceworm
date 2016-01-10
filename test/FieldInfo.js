'use strict';

const should = require('chai').should();
const expect = require('chai').expect;
const FieldInfo = require(__dirname + '/../src/FieldInfo');


describe("FieldInfo", () => {
  describe("FieldInfo class", () => {
    it("create instance", () => {
      let finfo = new FieldInfo("name", "namespace", "type", true, 5, 10);
      finfo.name.should.equal("name");
      finfo.namespace.should.equal("namespace");
      finfo.type.should.equal("type");
      finfo.required.should.equal(true);
      finfo.min.should.equal(5);
      finfo.max.should.equal(10);
    })
  });
  describe("create()", () => {
    it('Type', () => {
      FieldInfo.create('name', 'string').type.should.equal('string');
      FieldInfo.create('name', 'STRING').type.should.equal('string');
    });
    it('Type with namespace', () => {
      let s_without_ns = FieldInfo.create('', 'string');
      let s_with_ns = FieldInfo.create('', 'something.string');
      expect(s_without_ns.namespace).to.equal(undefined);
      s_without_ns.type.should.equal('string');
      expect(s_with_ns.namespace).to.equal('something');
      s_with_ns.type.should.equal('string');
    });
    it('Required', () => {
      FieldInfo.create('', '*type[]').required.should.equal(true);
      FieldInfo.create('', 'type[]').required.should.equal(false);
    });
    it('Min Length', () => {
      expect(FieldInfo.create('', 'type').min).to.be.undefined;
      FieldInfo.create('', 'type>10').min.should.equal(10);
    });
    it('Max Length', () => {
      expect(FieldInfo.create('', 'type').max).to.be.undefined;
      FieldInfo.create('', 'type<10').max.should.equal(10);
    });
  });
});