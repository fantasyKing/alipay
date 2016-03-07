/**
 * Created on 12/6/15.
 */
import fs from 'fs';
import md5 from './md5';
import rsa from './rsa';
import utils from './utils';
import qs from 'querystring';


class AlipaySubmit {

  constructor(config) {

    this.config = config;
    this.alipay_gateway = config.alipay_gateway;
  }

  buildRequestParams(params, key) {

    const sorted_params = utils.sortParams(utils.filterParams(params));
    sorted_params.sign = encodeURIComponent(this.signParams(sorted_params, key));
    sorted_params.sign_type = this.config.sign_type.trim().toUpperCase();
    return sorted_params;
  }

  signParams(sorted_params, key) {

    const sign_type = this.config.sign_type.trim().toUpperCase();
    const source = utils.createQueryString(sorted_params);

    if (sign_type === 'MD5') {

      return md5.md5Sign(source, key);
    } else if (sign_type === 'RSA') {

      let privateKey = key;
      if (typeof key === 'string') {

        privateKey = new Buffer(key, 'utf8');
      }
      return rsa.rsaSign(source, privateKey);
    } else {

      throw new Error('Unknown sign_type: ' + sign_type);
    }
  }

  buildRequestQueryString(params, key) {

    return utils.createQueryString(this.buildRequestParams(params, key));
  }

  async requestPayResult(params, key) {

    const formData = this.buildRequestParams(params, key);
    formData.input_charset = (this.config.input_charset || '').trim().toLowerCase();

    const options = {
      ca: fs.readFileSync(this.config.cacert),
      formData: formData
    };

    let failed = false;
    const rst = await utils.fetch.post(this.alipay_gateway, options).catch(() => failed = true);

    if (failed) {
      return failed;
    }

    if (rst && rst.body) {
      return rst.body;
    }

    return failed;
  }

  buildRequestForm(params, key, method, button_name) {

    const para = this.buildRequestParams(params, key);

    let sHtml = "<form id='alipaysubmit' name='alipaysubmit' action='"
      + this.alipay_gateway
      +  "_input_charset="
      + this.config['input_charset'].toLowerCase().trim()
      + "' method='" + method + "'>";

    for(let k of Object.keys(para)){
      let val = para[k];
      sHtml += "<input type='hidden' name='" + k + "' value='" + val + "'/>";
    }

    sHtml = sHtml+ "<input type='submit' value='" + button_name + "'></form>";

    sHtml = sHtml + "<script>document.forms['alipaysubmit'].submit();</script>";

    return sHtml;
  }
}

export default AlipaySubmit;