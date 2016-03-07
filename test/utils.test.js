/**
 * Created on 12/6/15.
 */

import 'babel-polyfill';
import utils from '../dist/utils';
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
    expect(queryString).to.be.equal('a="b"&c="d"&e="1"');
  });

  it('createQueryStringWithoutQuote', () => {

    const params = {
      a: '哈哈',
      c: 'd',
      e: 1
    };

    const queryString = utils.createQueryStringWithoutQuote(params);
    expect(queryString).to.be.equal('a=哈哈&c=d&e=1');
  });

  it('filterParams', () => {

    const params = {
      a: 'b',
      c: 'd',
      e: '',
      sign: 'sign',
      sign_type: 'sign_type'
    };

    const rst = utils.filterParams(params);

    assert(!rst.sign);
    assert(!rst.sign_type);
    assert(!rst.e);
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

  it('fetch', async () => {

    //const fetchResponse = await utils.fetch({url: 'httdps://google.com', method: 'GET'}).catch((e)=>{console.log(e)});
    const getResponse = await utils.fetch.get('https://httpbin.org/get');
    const postResponse = await utils.fetch.post('https://httpbin.org/post', {form: {key: 'value'}});

    //assert(!fetchResponse);
    assert(postResponse.statusCode === 200);
    assert(getResponse.statusCode === 200);
  });

  it('Log', () => {

    const log1 = utils.Log(1);
    const log2 = utils.Log(0);
    log1('log enabled');
    log2('this should not display.');

  });
});