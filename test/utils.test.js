/**
 * Created on 12/6/15.
 */

import 'babel-polyfill';
import utils from '../lib/utils';
import chai from 'chai';

const expect = chai.expect;
const assert = chai.assert;

describe('test utils', () => {

  it('createQueryString', () => {

    const params = {
      a: 'b',
      c: 'd',
      e: 1
    };

    const queryString = utils.createQueryString(params);
    expect(queryString).to.be.equal('a=b&c=d&e=1');
  });

  it('filterParams', () => {

    const params = {
      a: 'b',
      c: 'd',
      e: '',
      sign: 'sign',
      sign_type: 'sign_type'
    };

    utils.filterParams(params);

    assert(!params.sign);
    assert(!params.sign_type);
    assert(!params.e);
  });

  it('sortParams', () => {

    const params = {
      e: '',
      ab: 'b',
      aa: 'd',
      sign: 'sign',
      '12': 3,
      '11': 4
    };

    const sorted = utils.sortParams(params);

    expect(Object.keys(sorted)).to.eql(['11', '12', 'aa', 'ab', 'e', 'sign']);
    expect(Object.keys(sorted)).to.not.eql(['aa', '11', '12', 'ab', 'e', 'sign']);
  });

  it.only('fetch', async () => {

    const getResponse = await utils.fetch.get('http://sudoboot.com');
    const postResponse = await utils.fetch.post('https://httpbin.org/post', {form: {key: 'value'}});
    assert(postResponse.statusCode === 200);
    assert(getResponse.statusCode === 200);
  });

});