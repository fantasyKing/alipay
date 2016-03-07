'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created on 12/3/15.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _notify = require('./notify');

var _notify2 = _interopRequireDefault(_notify);

var _submit = require('./submit');

var _submit2 = _interopRequireDefault(_submit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Alipay = function () {
  function Alipay(config) {
    _classCallCheck(this, Alipay);

    this.config = config;
    this.alipaySubmit = new AlipaySubmit(config);
    this.alipayNotify = new _notify2.default(config);
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
   * key: 如果 `sign_type` 为 md5, 则为 md5_key, 类型 String
   * 如果 `sign_type` 为 RSA, 则为商户的 RSA Private Key, 类型 Buffer
   *
   * @param data
   * @param key
   * @returns {*}
   */


  _createClass(Alipay, [{
    key: 'mobile_security_pay',
    value: function mobile_security_pay(data, key) {

      var params = {
        service: this.config.service.mobile_security_pay,
        partner: this.config.partner,
        seller_id: this.config.seller_email,
        payment_type: this.config.payment_type.buy,
        notify_url: _url2.default.resolve(this.config.host, this.config.notify.mobile_security_pay),
        _input_charset: this.config.input_charset,
        it_b_pay: '15d' // 设置未付款交易的超时时间，一旦超时，该笔交易就会自动被关闭。
      };

      Object.keys(data).forEach(function (key) {
        return params[key] = data[key];
      });

      return this.alipaySubmit.buildRequestQueryString(this.alipaySubmit.buildRequestParams(params, key));
    }
  }, {
    key: 'create_direct_pay_by_user',
    value: function create_direct_pay_by_user(data, key) {

      var parameter = {
        service: this.config.service.create_direct_pay_by_user,
        partner: this.config.partner,
        payment_type: this.config.payment_type.buy, //支付类型,
        notify_url: _url2.default.resolve(this.config.host, this.config.notify.create_direct_pay_by_user), //服务器异步通知页面路径,必填，不能修改, 需http://格式的完整路径，不能加?id=123这类自定义参数,
        return_url: _url2.default.resolve(this.config.host, this.config.return.create_direct_pay_by_user), //页面跳转同步通知页面路径 需http://格式的完整路径，不能加?id=123这类自定义参数，不能写成http://localhost/,
        seller_email: this.config.seller_email, //卖家支付宝帐户 必填
        _input_charset: this.config.input_charset.toLowerCase().trim()
      };

      Object.keys(data).forEach(function (key) {
        return params[key] = data[key];
      });
      return this.alipaySubmit.buildRequestForm(parameter, key, "get", "确认");
    }
  }, {
    key: 'create_partner_trade_by_buyer',
    value: function create_partner_trade_by_buyer(data, key) {

      var parameter = {
        service: this.config.service.create_partner_trade_by_buyer,
        partner: this.config.partner,
        payment_type: this.config.payment_type.buy,
        notify_url: _url2.default.resolve(this.config.host, this.config.notify.create_partner_trade_by_buyer),
        return_url: _url2.default.resolve(this.config.host, this.config.return.create_partner_trade_by_buyer),
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
  }, {
    key: 'trade_create_by_buyer',
    value: function trade_create_by_buyer(data, key) {

      var parameter = {
        service: this.config.service.trade_create_by_buyer,
        partner: this.config.partner,
        payment_type: this.config.payment_type.buy,
        notify_url: _url2.default.resolve(this.config.host, this.config.notify.trade_create_by_buyer),
        return_url: _url2.default.resolve(this.config.host, this.config.return.trade_create_by_buyer),
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
  }, {
    key: 'verifyNotify',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(params, key) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.alipayNotify.verifyNotify(params, key);

              case 2:
                return _context.abrupt('return', _context.sent);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function verifyNotify(_x, _x2) {
        return ref.apply(this, arguments);
      };
    }()
  }, {
    key: 'verifyReturn',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(params, key) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.alipayNotify.verifyReturn(params, key);

              case 2:
                return _context2.abrupt('return', _context2.sent);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function verifyReturn(_x3, _x4) {
        return ref.apply(this, arguments);
      };
    }()
  }]);

  return Alipay;
}();

exports.default = Alipay;