/**
 * Created on 12/6/15.
 */

'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _md5 = require('./md5');

var _md52 = _interopRequireDefault(_md5);

var _rsa = require('./rsa');

var _rsa2 = _interopRequireDefault(_rsa);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var AlipayNotify = (function () {
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
   * 如果 `sign_type` 为 RSA, 则为支付宝的 RSA Public Key, 类型 Buffer || String
   *
   * @param params
   * @param key
   * @returns {*}
   */

  _createClass(AlipayNotify, [{
    key: 'verifyNotify',
    value: function verifyNotify(params, key) {
      var verifyResult, remoteVerifyResult;
      return _regeneratorRuntime.async(function verifyNotify$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (!_Object$keys(params).length) {
              context$2$0.next = 6;
              break;
            }

            verifyResult = this.verifySign(params, key);
            context$2$0.next = 4;
            return _regeneratorRuntime.awrap(this.remoteVerify(params.notify_id));

          case 4:
            remoteVerifyResult = context$2$0.sent;
            return context$2$0.abrupt('return', verifyResult && remoteVerifyResult);

          case 6:
            return context$2$0.abrupt('return', false);

          case 7:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'verifyReturn',
    value: function verifyReturn(params, key) {
      var verifyResult, remoteVerifyResult;
      return _regeneratorRuntime.async(function verifyReturn$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (!_Object$keys(params).length) {
              context$2$0.next = 6;
              break;
            }

            verifyResult = this.verifySign(params, key);
            context$2$0.next = 4;
            return _regeneratorRuntime.awrap(this.remoteVerify(params.notify_id));

          case 4:
            remoteVerifyResult = context$2$0.sent;
            return context$2$0.abrupt('return', verifyResult && remoteVerifyResult);

          case 6:
            return context$2$0.abrupt('return', false);

          case 7:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'verifySign',
    value: function verifySign(params, key) {

      var sign_type = params.sign_type.trim().toUpperCase();
      var sign = params.sign;
      var source = _utils2['default'].createQueryStringWithoutQuote(_utils2['default'].sortParams(_utils2['default'].filterParams(params)));

      if (sign_type === 'MD5') {

        if (!key) {

          key = this.config.md5_key;
        }

        return _md52['default'].md5Verify(source, key, sign);
      } else if (sign_type === 'RSA') {

        var publicKey = key;

        if (key) {

          if (typeof key === 'string') {

            publicKey = new Buffer(key, 'utf8');
          }
        } else {

          publicKey = new Buffer(this.config.alipay_public_key, 'utf8');
        }

        return _rsa2['default'].rsaVerify(source, publicKey, sign);
      } else {

        throw new Error('Unknown sign_type: ' + sign_type);
      }
    }
  }, {
    key: 'remoteVerify',
    value: function remoteVerify(notify_id) {
      var transport, partner, verify_url, options, failed, response;
      return _regeneratorRuntime.async(function remoteVerify$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
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
            context$2$0.next = 9;
            return _regeneratorRuntime.awrap(_utils2['default'].fetch.get(verify_url, options)['catch'](function (e) {

              failed = true;
              _utils2['default'].Log(1)('remoteVerify error: ', e);
            }));

          case 9:
            response = context$2$0.sent;

            _utils2['default'].Log(1)(response ? response.body : false);

            if (!failed) {
              context$2$0.next = 13;
              break;
            }

            return context$2$0.abrupt('return', false);

          case 13:
            return context$2$0.abrupt('return', response && response.body === 'true');

          case 14:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }]);

  return AlipayNotify;
})();

exports['default'] = AlipayNotify;
module.exports = exports['default'];