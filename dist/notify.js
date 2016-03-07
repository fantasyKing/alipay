'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created on 12/6/15.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _md = require('./md5');

var _md2 = _interopRequireDefault(_md);

var _rsa = require('./rsa');

var _rsa2 = _interopRequireDefault(_rsa);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AlipayNotify = function () {
  function AlipayNotify(config) {
    _classCallCheck(this, AlipayNotify);

    this.config = config;
    this.https_verify_url = config.https_verify_url;
    this.http_verify_url = config.http_verify_url;
  }

  /**
   * 验签 `notify_url` 的调用者是否为支付宝
   *
   * key: 如果 `sign_type` 为 md5, 则为 md5_key, 类型 String
   * 如果 `sign_type` 为 RSA, 则为支付宝的 RSA Public Key, 类型 Buffer
   *
   * @param params
   * @returns {*}
   */


  _createClass(AlipayNotify, [{
    key: 'verifyNotify',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(params, key) {
        var verifyResult, remoteVerifyResult;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!Object.keys(params).length) {
                  _context.next = 6;
                  break;
                }

                verifyResult = this.verifySign(params, key);
                _context.next = 4;
                return this.remoteVerify(params.notify_id);

              case 4:
                remoteVerifyResult = _context.sent;
                return _context.abrupt('return', verifyResult && remoteVerifyResult);

              case 6:
                return _context.abrupt('return', false);

              case 7:
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
        var verifyResult, remoteVerifyResult;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!Object.keys(params).length) {
                  _context2.next = 6;
                  break;
                }

                verifyResult = this.verifySign(params, key);
                _context2.next = 4;
                return this.remoteVerify(params.notify_id);

              case 4:
                remoteVerifyResult = _context2.sent;
                return _context2.abrupt('return', verifyResult && remoteVerifyResult);

              case 6:
                return _context2.abrupt('return', false);

              case 7:
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
  }, {
    key: 'verifySign',
    value: function verifySign(params, key) {

      var sign_type = params.sign_type.trim().toUpperCase();
      var sign = params.sign;
      var source = _utils2.default.createQueryStringWithoutQuote(_utils2.default.sortParams(_utils2.default.filterParams(params)));

      if (sign_type === 'MD5') {

        return _md2.default.md5Verify(source, key, sign);
      } else if (sign_type === 'RSA') {

        return _rsa2.default.rsaVerify(source, key, sign);
      } else {

        throw new Error('Unknown sign_type: ' + sign_type);
      }
    }
  }, {
    key: 'remoteVerify',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(notify_id) {
        var transport, partner, verify_url, options, failed, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                transport = this.config.transport.trim().toLocaleLowerCase();
                partner = this.config.partner.trim();
                verify_url = transport === 'https' ? this.https_verify_url : this.http_verify_url;


                verify_url += "partner=" + partner + "&notify_id=" + notify_id;

                options = {};


                if (transport === 'https') {

                  //options.ca = fs.readFileSync(this.config.cacert);
                }

                failed = false;
                _context3.next = 9;
                return _utils2.default.fetch.get(verify_url, options).catch(function (e) {

                  failed = true;
                  _utils2.default.Log(1)('remoteVerify error: ', e);
                });

              case 9:
                response = _context3.sent;


                _utils2.default.Log(1)(response ? response.body : false);

                if (!failed) {
                  _context3.next = 13;
                  break;
                }

                return _context3.abrupt('return', false);

              case 13:
                return _context3.abrupt('return', response && response.body === 'true');

              case 14:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function remoteVerify(_x5) {
        return ref.apply(this, arguments);
      };
    }()
  }]);

  return AlipayNotify;
}();

exports.default = AlipayNotify;