/**
 * Created on 12/3/15.
 */

import md5 from '../lib/md5';
import chai from 'chai';

let expect = chai.expect;
let assert = chai.assert;

describe('test md5', () => {

  it('md5Sign', () => {

    expect(md5.md5Sign('source', 'key')).to.be.equal('c2dbb8438b0e55ead91e51f9b6cd8e73');
    expect(md5.md5Sign('source', 'key')).to.not.equal('c2dbb8438b0e55ead91e51f9b6cd8e');
  });

  it('md5Verify', () => {

    assert(md5.md5Verify('source', 'key', 'c2dbb8438b0e55ead91e51f9b6cd8e73'), 'should be equal.');
    expect(md5.md5Verify('source', 'key', 'c2dbb8438b0e55ead91e51f9b6cd8e')).to.not.be.true;
  });
});