/**
 * Created on 12/6/15.
 */
'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _md5 = require('./md5');

var _md52 = _interopRequireDefault(_md5);

var _rsa = require('./rsa');

var _rsa2 = _interopRequireDefault(_rsa);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var AlipaySubmit = (function () {
  function AlipaySubmit(config) {
    _classCallCheck(this, AlipaySubmit);

    this.config = config;
    this.alipay_gateway = config.alipay_gateway;
  }

  _createClass(AlipaySubmit, [{
    key: 'buildRequestParams',
    value: function buildRequestParams(params, key) {

      var sorted_params = _utils2['default'].sortParams(_utils2['default'].filterParams(params));
      sorted_params.sign = encodeURIComponent(this.signParams(sorted_params, key));
      sorted_params.sign_type = this.config.sign_type.trim().toUpperCase();
      return sorted_params;
    }
  }, {
    key: 'signParams',
    value: function signParams(sorted_params, key) {

      var sign_type = this.config.sign_type.trim().toUpperCase();
      var source = _utils2['default'].createQueryString(sorted_params);

      if (sign_type === 'MD5') {

        if (!key) {

          key = this.config.md5_key;
        }
        return _md52['default'].md5Sign(source, key);
      } else if (sign_type === 'RSA') {

        var privateKey = key;

        if (key) {

          if (typeof key === 'string') {

            privateKey = new Buffer(key, 'utf8');
          }
        } else {

          privateKey = new Buffer(this.config.partner_private, 'utf8');
        }
        return _rsa2['default'].rsaSign(source, privateKey);
      } else {

        throw new Error('Unknown sign_type: ' + sign_type);
      }
    }
  }, {
    key: 'buildRequestQueryString',
    value: function buildRequestQueryString(params, key) {

      return _utils2['default'].createQueryString(this.buildRequestParams(params, key));
    }
  }, {
    key: 'requestPayResult',
    value: function requestPayResult(params, key) {
      var formData, options, failed, rst;
      return _regeneratorRuntime.async(function requestPayResult$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            formData = this.buildRequestParams(params, key);

            formData.input_charset = (this.config.input_charset || '').trim().toLowerCase();

            options = {
              ca: _fs2['default'].readFileSync(this.config.cacert),
              formData: formData
            };
            failed = false;
            context$2$0.next = 6;
            return _regeneratorRuntime.awrap(_utils2['default'].fetch.post(this.alipay_gateway, options)['catch'](function () {
              return failed = true;
            }));

          case 6:
            rst = context$2$0.sent;

            if (!failed) {
              context$2$0.next = 9;
              break;
            }

            return context$2$0.abrupt('return', failed);

          case 9:
            if (!(rst && rst.body)) {
              context$2$0.next = 11;
              break;
            }

            return context$2$0.abrupt('return', rst.body);

          case 11:
            return context$2$0.abrupt('return', failed);

          case 12:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'buildRequestForm',
    value: function buildRequestForm(params, key, method, button_name) {

      var para = this.buildRequestParams(params, key);

      var sHtml = "<form id='alipaysubmit' name='alipaysubmit' action='" + this.alipay_gateway + "_input_charset=" + this.config['input_charset'].toLowerCase().trim() + "' method='" + method + "'>";

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _getIterator(_Object$keys(para)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var k = _step.value;

          var val = para[k];
          sHtml += "<input type='hidden' name='" + k + "' value='" + val + "'/>";
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      sHtml = sHtml + "<input type='submit' value='" + button_name + "'></form>";

      sHtml = sHtml + "<script>document.forms['alipaysubmit'].submit();</script>";

      return sHtml;
    }
  }]);

  return AlipaySubmit;
})();

exports['default'] = AlipaySubmit;
module.exports = exports['default'];