/**
 * Created on 12/7/15.
 */

import path from 'path';

export default {
  partner: '2088123456789011', //合作身份者id，以2088开头的16位纯数字
  seller_email: 'test@mail.com', //卖家支付宝帐户 必填
  host: 'http://localhost:3083/', //域名
  cacert: path.join(__dirname, 'cacert.pem'),//ca证书路径地址，用于curl中ssl校验 请保证cacert.pem文件在当前文件夹目录中
  transport: 'https', //访问模式,根据自己的服务器是否支持ssl访问，若支持请选择https；若不支持请选择http
  input_charset: 'utf-8',//字符编码格式 目前支持 gbk 或 utf-8
  sign_type: 'MD5',
  md5_key: 'abcdefghijklmnopqrstuvwxyz123456', //安全检验码，以数字和字母组成的32位字符
  rsa_private_key: path.join(__dirname, './rsa_private_key.pem'),
  rsa_public_key: path.join(__dirname, './rsa_public_key.pem'),
  alipay_gateway: 'https://mapi.alipay.com/gateway.do?',
  https_verify_url: 'https://mapi.alipay.com/gateway.do?service=notify_verify&',
  http_verify_url: 'http://notify.alipay.com/trade/notify_query.do?',

  create_direct_pay_by_user_return_url: '/alipay/create_direct_pay_by_user/return_url',
  create_direct_pay_by_user_notify_url: '/alipay/create_direct_pay_by_user/notify_url',
  refund_fastpay_by_platform_pwd_notify_url: '/alipay/refund_fastpay_by_platform_pwd/notify_url',
  create_partner_trade_by_buyer_notify_url: '/aplipay/create_partner_trade_by_buyer/notify_url',
  create_partner_trade_by_buyer_return_url: '/aplipay/create_partner_trade_by_buyer/return_url',
  trade_create_by_buyer_return_url: '/alipay/trade_create_by_buyer/return_url',
  trade_create_by_buyer_notify_url: '/alipay/trade_create_by_buyer/notify_url',

  service_create_direct_pay_by_user: 'create_direct_pay_by_user',
  service_refund_fastpay_by_platform_pwd: 'refund_fastpay_by_platform_pwd',
  service_create_partner_trade_by_buyer: 'create_partner_trade_by_buyer',
  service_send_goods_confirm_by_platform: 'send_goods_confirm_by_platform',
  service_trade_create_by_buyer: 'trade_create_by_buyer',

  payment_type: {
    buy: '1',
    donate: '4',
    coupon: '47'
  }
};