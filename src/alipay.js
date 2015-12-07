/**
 * Created on 12/3/15.
 */
import assert from 'assert';
import url from 'url';
import AlipayNotify from './notify';
import AliPaySubmit from './submit';

class Alipay {

  constructor(config) {

    this.config = config;
  }

  create_direct_pay_by_user(data) {

    assert.ok(data.out_trade_no && data.subject && data.total_fee);

    const alipaySubmit = new AlipaySubmit(this.config);

    const parameter = {
      service: 'create_direct_pay_by_user',
      partner: this.config.partner,
      payment_type: '1', //支付类型,
      notify_url: url.resolve(this.config.host, this.config.create_direct_pay_by_user_notify_url), //服务器异步通知页面路径,必填，不能修改, 需http://格式的完整路径，不能加?id=123这类自定义参数,
      return_url: url.resolve(this.config.host, this.config.create_direct_pay_by_user_return_url), //页面跳转同步通知页面路径 需http://格式的完整路径，不能加?id=123这类自定义参数，不能写成http://localhost/,
      seller_email: this.config.seller_email, //卖家支付宝帐户 必填
      _input_charset: this.config.input_charset.toLowerCase().trim()
    };

    for (let key of Object.keys(data)) {
      parameter[key] = data[key];
    }

    return alipaySubmit.buildRequestForm(parameter, "get", "确认");
  }

  create_partner_trade_by_buyer(data) {

    const alipaySubmit = new AlipaySubmit(this.config);

    const parameter = {
      service: 'create_partner_trade_by_buyer',
      partner: this.config.partner,
      payment_type: '1',
      notify_url: url.resolve(this.config.host, this.config.create_partner_trade_by_buyer_notify_url),
      return_url: url.resolve(this.config.host, this.config.create_partner_trade_by_buyer_return_url),
      seller_email: this.config.seller_email,
      out_trade_no: data.out_trade_no,
      subject: data.subject,
      price: data.price,
      quantity: data.quantity,
      logistics_fee: data.logistics_fee,
      logistics_type: data.logistics_type,
      logistics_payment: data.logistics_payment,
      body: data.body,
      show_url: data.show_url,
      receive_name: data.receive_name,
      receive_address: data.receive_address,
      receive_zip: data.receive_zip,
      receive_phone: data.receive_phone,
      receive_mobile: data.receive_mobile,
      _input_charset: this.config.input_charset.toLowerCase().trim()
    };

    return alipaySubmit.buildRequestForm(parameter, "get", "确认");
  }

  trade_create_by_buyer(data) {

    const alipaySubmit = new AlipaySubmit(this.config);

    const parameter = {
      service: 'trade_create_by_buyer',
      partner: this.config.partner,
      payment_type: '1',
      notify_url: url.resolve(this.config.host, this.config.trade_create_by_buyer_notify_url),
      return_url: url.resolve(this.config.host, this.config.trade_create_by_buyer_return_url),
      seller_email: this.config.seller_email,
      out_trade_no: data.out_trade_no,
      subject: data.subject,
      price: data.price,
      quantity: data.quantity,
      logistics_fee: data.logistics_fee,
      logistics_type: data.logistics_type,
      logistics_payment: data.logistics_payment,
      body: data.body,
      show_url: data.show_url,
      receive_name: data.receive_name,
      receive_address: data.receive_address,
      receive_zip: data.receive_zip,
      receive_phone: data.receive_phone,
      receive_mobile: data.receive_mobile,
      _input_charset: this.config.input_charset.toLowerCase().trim()
    };

    return alipaySubmit.buildRequestForm(parameter, "get", "确认");
  }

  async verifyNotify(params) {

    const alipayNotify = new AlipayNotify(this.config);
    return await alipayNotify.verifyNotify(params);
  }

  async verifyReturn(params) {

    const alipayNotify = new AlipayNotify(this.config);
    return await alipayNotify.verifyReturn(params);
  }
}

export default Alipay;