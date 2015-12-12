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

  async verifyNotify(params) {

    if (Object.keys(params).length) {

      const verifyResult = this.verifySign(params);
      const remoteVerifyResult = await this.remoteVerify(params.notify_id);
      return verifyResult && remoteVerifyResult;
    }
    return false;
  }

  async verifyReturn(params) {

    if (Object.keys(params).length) {

      const verifyResult = this.verifySign(params);
      const remoteVerifyResult = await this.remoteVerify(params.notify_id);
      return verifyResult && remoteVerifyResult;
    }
    return false;
  }

  verifySign(params) {

    const sign_type = params.sign_type.trim().toUpperCase();
    const sign = params.sign;
    const source = utils.createQueryString(utils.sortParams(utils.filterParams(params)));

    if (sign_type === 'MD5') {

      const md5_key = this.config.md5_key;
      return md5.md5Verify(source, md5_key, sign);
    } else if (sign_type === 'RSA') {

      const rsa_public_key = fs.readFileSync(this.config.alipay_rsa_public_key);
      return rsa.rsaVerify(source, rsa_public_key, sign);
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