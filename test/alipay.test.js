/**
 * Created on 12/7/15.
 */
import 'babel-polyfill';
import Alipay from '../src/index.js';
import chai from 'chai';
import config from '../res/config.test';
import forge from 'node-forge';
import fs from 'fs';
import path from 'path'


const expect = chai.expect;
const assert = chai.assert;

describe('test Alipay', () => {

  const alipay = new Alipay.Alipay(config);

  const pKeypair = forge.pki.rsa.generateKeyPair({bits: 2048, e: 0x10001});
  const pPublicKey = new Buffer(forge.pki.publicKeyToPem(pKeypair.publicKey), 'utf8');
  const pPrivateKey = new Buffer(forge.pki.privateKeyToPem(pKeypair.privateKey), 'utf8');
  const privateKey = fs.readFileSync(path.join(__dirname, '../res/rsa_private_key.pem'));


  it.only('mobile security pay', () => {

    const orderStr = alipay.mobile_security_pay({out_trade_no: 1}, privateKey);

    console.log('orderStr = ', orderStr);
    expect(orderStr).to.be.a('string');
  });

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