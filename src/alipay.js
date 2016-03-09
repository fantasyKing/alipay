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
    this.alipaySubmit = new AliPaySubmit(config);
    this.alipayNotify = new AlipayNotify(config);
  }

  /**
   * 为手机客户端即时到账交易创建 `orderStr`
   *
   * data = {
   *  out_trade_no: '', // 商户系统生成的唯一订单号, 必填
   *  subject: '', // 订单名称, 必填
   *  total_fee: '', // 付款金额, 必填
   *  body: '' // 订单描述
   * }
   *
   *
   * key: 如果 `sign_type` 为 md5, 则为 md5_key, 类型 String ** warn ** md5 有问题
   * 如果 `sign_type` 为 RSA, 则为商户的 RSA Private Key, 类型 Buffer || String, 默认 RSA
   *
   * @param data
   * @param key
   * @returns {*}
   */
  mobile_security_pay(data, key) {

    const params = {
      service: this.config.mobile_security_pay,
      partner: this.config.partner,
      seller_id: this.config.seller_email,
      payment_type: this.config.payment_type.buy,
      notify_url: url.resolve(this.config.host, this.config.mobile_security_pay_notify),
      _input_charset: this.config.input_charset,
      it_b_pay: '15d' // 设置未付款交易的超时时间，一旦超时，该笔交易就会自动被关闭。
    };

    Object.keys(data).forEach(key => params[key] = data[key]);

    return this.alipaySubmit.buildRequestQueryString(params, key);
  }

  create_direct_pay_by_user(data, key) {

    const parameter = {
      service: this.config.create_direct_pay_by_user,
      partner: this.config.partner,
      payment_type: this.config.payment_type.buy, //支付类型,
      notify_url: url.resolve(this.config.host, this.config.create_direct_pay_by_user_notify), //服务器异步通知页面路径,必填，不能修改, 需http://格式的完整路径，不能加?id=123这类自定义参数,
      return_url: url.resolve(this.config.host, this.config.create_direct_pay_by_user_return), //页面跳转同步通知页面路径 需http://格式的完整路径，不能加?id=123这类自定义参数，不能写成http://localhost/,
      seller_email: this.config.seller_email, //卖家支付宝帐户 必填
      _input_charset: this.config.input_charset.toLowerCase().trim()
    };

    Object.keys(data).forEach(key => params[key] = data[key]);
    return this.alipaySubmit.buildRequestForm(parameter, key, "get", "确认");
  }

  create_partner_trade_by_buyer(data, key) {

    const parameter = {
      service: this.config.create_partner_trade_by_buyer,
      partner: this.config.partner,
      payment_type: this.config.payment_type.buy,
      notify_url: url.resolve(this.config.host, this.config.create_partner_trade_by_buyer_notify),
      return_url: url.resolve(this.config.host, this.config.create_partner_trade_by_buyer_return),
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

    return this.alipaySubmit.buildRequestForm(parameter, key, "get", "确认");
  }

  trade_create_by_buyer(data, key) {

    const parameter = {
      service: this.config.trade_create_by_buyer,
      partner: this.config.partner,
      payment_type: this.config.payment_type.buy,
      notify_url: url.resolve(this.config.host, this.config.trade_create_by_buyer_notify),
      return_url: url.resolve(this.config.host, this.config.trade_create_by_buyer_return),
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

    return this.alipaySubmit.buildRequestForm(parameter, key, "get", "确认");
  }

  async verifyNotify(params, key) {

    return await this.alipayNotify.verifyNotify(params, key);
  }

  async verifyReturn(params, key) {

    return await this.alipayNotify.verifyReturn(params, key);
  }
}

export default Alipay;