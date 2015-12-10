/**
 * Created on 12/7/15.
 */
import 'babel-polyfill';
import Alipay from '../index.js';
import chai from 'chai';
import config from '../res/config.test';

const expect = chai.expect;
const assert = chai.assert;

describe('test Alipay', () => {

  const alipay = new Alipay.Alipay(config);
  it('verifyNotify', async () => {

    const params = {
      partner: '2088012534717844',
      notify_id: '2132434322543543',
      sign_type: 'MD5',
      sign: '2ecbc70a9e9b6794a258da301251ed72'
    };
    const rst = await alipay.verifyNotify(params);
    expect(rst).to.be.false;
  });
});