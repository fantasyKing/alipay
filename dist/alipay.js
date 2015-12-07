'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * Created on 12/3/15.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _notify = require('./notify');

var _notify2 = _interopRequireDefault(_notify);

var _submit = require('./submit');

var _submit2 = _interopRequireDefault(_submit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Alipay = (function () {
  function Alipay(config) {
    _classCallCheck(this, Alipay);

    this.config = config;
  }

  _createClass(Alipay, [{
    key: 'create_direct_pay_by_user',
    value: function create_direct_pay_by_user(data) {

      _assert2.default.ok(data.out_trade_no && data.subject && data.total_fee);

      var alipaySubmit = new AlipaySubmit(this.config);

      var parameter = {
        service: 'create_direct_pay_by_user',
        partner: this.config.partner,
        payment_type: '1', //支付类型,
        notify_url: _url2.default.resolve(this.config.host, this.config.create_direct_pay_by_user_notify_url), //服务器异步通知页面路径,必填，不能修改, 需http://格式的完整路径，不能加?id=123这类自定义参数,
        return_url: _url2.default.resolve(this.config.host, this.config.create_direct_pay_by_user_return_url), //页面跳转同步通知页面路径 需http://格式的完整路径，不能加?id=123这类自定义参数，不能写成http://localhost/,
        seller_email: this.config.seller_email, //卖家支付宝帐户 必填
        _input_charset: this.config.input_charset.toLowerCase().trim()
      };

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(data)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          parameter[key] = data[key];
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return alipaySubmit.buildRequestForm(parameter, "get", "确认");
    }
  }, {
    key: 'create_partner_trade_by_buyer',
    value: function create_partner_trade_by_buyer(data) {

      var alipaySubmit = new AlipaySubmit(this.config);

      var parameter = {
        service: 'create_partner_trade_by_buyer',
        partner: this.config.partner,
        payment_type: '1',
        notify_url: _url2.default.resolve(this.config.host, this.config.create_partner_trade_by_buyer_notify_url),
        return_url: _url2.default.resolve(this.config.host, this.config.create_partner_trade_by_buyer_return_url),
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
  }, {
    key: 'trade_create_by_buyer',
    value: function trade_create_by_buyer(data) {

      var alipaySubmit = new AlipaySubmit(this.config);

      var parameter = {
        service: 'trade_create_by_buyer',
        partner: this.config.partner,
        payment_type: '1',
        notify_url: _url2.default.resolve(this.config.host, this.config.trade_create_by_buyer_notify_url),
        return_url: _url2.default.resolve(this.config.host, this.config.trade_create_by_buyer_return_url),
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
  }, {
    key: 'verifyNotify',
    value: (function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(params) {
        var alipayNotify;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                alipayNotify = new _notify2.default(this.config);
                _context.next = 3;
                return alipayNotify.verifyNotify(params);

              case 3:
                return _context.abrupt('return', _context.sent);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function verifyNotify(_x) {
        return ref.apply(this, arguments);
      };
    })()
  }, {
    key: 'verifyReturn',
    value: (function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(params) {
        var alipayNotify;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                alipayNotify = new _notify2.default(this.config);
                _context2.next = 3;
                return alipayNotify.verifyReturn(params);

              case 3:
                return _context2.abrupt('return', _context2.sent);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function verifyReturn(_x2) {
        return ref.apply(this, arguments);
      };
    })()
  }]);

  return Alipay;
})();

exports.default = Alipay;