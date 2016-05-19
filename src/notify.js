/**
 * Created on 12/6/15.
 */

import utils from './utils';
import md5 from './md5';
import rsa from './rsa';
import fs from 'fs';

class AlipayNotify {

  constructor(config) {

    this.config = config;
    this.https_verify_url = config.https_verify_url;
    this.http_verify_url = config.http_verify_url;
  }

  async verifyOrder(queryString) {
    const url = 'https://openapi.alipay.com/gateway.do?' + queryString;
    let error = null;
    const response = await utils.fetch.get(url).catch(e => {
      error = e;
    });
    if (error) {
      console.log('verifyOrder result = ', error);
      throw error;
    }
    const result = JSON.parse(response.body);
    console.log('verifyOrder result = ', result);
    return result;
  }

  /**
   * 验签 `notify_url` 的调用者是否为支付宝
   *
   * key: 如果 `sign_type` 为 md5, 则为 md5_key, 类型 String
   * 如果 `sign_type` 为 RSA, 则为支付宝的 RSA Public Key, 类型 Buffer || String
   *
   * @param params
   * @param key
   * @returns {*}
   */
  async verifyNotify(params, key) {

    if (Object.keys(params).length) {

      const verifyResult = this.verifySign(params, key);
      const remoteVerifyResult = await this.remoteVerify(params.notify_id);
      return verifyResult && remoteVerifyResult;
    }
    return false;
  }

  async verifyReturn(params, key) {

    if (Object.keys(params).length) {

      const verifyResult = this.verifySign(params, key);
      const remoteVerifyResult = await this.remoteVerify(params.notify_id);
      return verifyResult && remoteVerifyResult;
    }
    return false;
  }

  verifySign(params, key) {

    const sign_type = params.sign_type.trim().toUpperCase();
    const sign = params.sign;
    const source = utils.createQueryStringWithoutQuote(utils.sortParams(utils.filterParams(params)));

    if (sign_type === 'MD5') {

      if (!key) {

        key = this.config.md5_key;
      }

      return md5.md5Verify(source, key, sign);
    } else if (sign_type === 'RSA') {

      let publicKey = key;

      if (key) {

        if (typeof key === 'string') {

          publicKey = new Buffer(key, 'utf8');
        }
      } else {

        publicKey = new Buffer(this.config.alipay_public_key, 'utf8');
      }

      return rsa.rsaVerify(source, publicKey, sign);
    } else {

      throw new Error('Unknown sign_type: ' + sign_type);
    }
  }

  async remoteVerify(notify_id) {

    const transport = this.config.transport.trim().toLocaleLowerCase();
    const partner = this.config.partner.trim();

    let verify_url = transport === 'https' ? this.https_verify_url : this.http_verify_url;

    verify_url += "partner=" + partner +  "&notify_id=" + notify_id;

    const options = {};

    if (transport === 'https') {

      //options.ca = fs.readFileSync(this.config.cacert);
    }

    let failed = false;
    const response = await utils.fetch.get(verify_url, options).catch((e) => {

      failed = true;
      utils.Log(1)('remoteVerify error: ', e);
    });

    utils.Log(1)(response ? response.body : false);

    if (failed) {

      return false;
    }

    return response && response.body === 'true';
  }
}

export default AlipayNotify;