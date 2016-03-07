'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created on 12/6/15.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _md = require('./md5');

var _md2 = _interopRequireDefault(_md);

var _rsa = require('./rsa');

var _rsa2 = _interopRequireDefault(_rsa);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AlipaySubmit = function () {
  function AlipaySubmit(config) {
    _classCallCheck(this, AlipaySubmit);

    this.config = config;
    this.alipay_gateway = config.alipay_gateway;
  }

  _createClass(AlipaySubmit, [{
    key: 'buildRequestParams',
    value: function buildRequestParams(params, key) {

      var sorted_params = _utils2.default.sortParams(_utils2.default.filterParams(params));
      sorted_params.sign = encodeURIComponent(this.signParams(sorted_params, key));
      sorted_params.sign_type = this.config.sign_type.trim().toUpperCase();
      return sorted_params;
    }
  }, {
    key: 'signParams',
    value: function signParams(sorted_params, key) {

      var sign_type = this.config.sign_type.trim().toUpperCase();
      var source = _utils2.default.createQueryString(sorted_params);

      if (sign_type === 'MD5') {

        return _md2.default.md5Sign(source, key);
      } else if (sign_type === 'RSA') {

        return _rsa2.default.rsaSign(source, key);
      } else {

        throw new Error('Unknown sign_type: ' + sign_type);
      }
    }
  }, {
    key: 'buildRequestQueryString',
    value: function buildRequestQueryString(params, key) {

      return _utils2.default.createQueryString(this.buildRequestParams(params, key));
    }
  }, {
    key: 'requestPayResult',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(params, key) {
        var formData, options, failed, rst;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                formData = this.buildRequestParams(params, key);

                formData.input_charset = (this.config.input_charset || '').trim().toLowerCase();

                options = {
                  ca: _fs2.default.readFileSync(this.config.cacert),
                  formData: formData
                };
                failed = false;
                _context.next = 6;
                return _utils2.default.fetch.post(this.alipay_gateway, options).catch(function () {
                  return failed = true;
                });

              case 6:
                rst = _context.sent;


                console.log(rst ? rst.body : failed);

                if (!failed) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt('return', failed);

              case 10:
                if (!(rst && rst.body)) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt('return', rst.body);

              case 12:
                return _context.abrupt('return', failed);

              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function requestPayResult(_x, _x2) {
        return ref.apply(this, arguments);
      };
    }()
  }, {
    key: 'buildRequestForm',
    value: function buildRequestForm(params, key, method, button_name) {

      var para = this.buildRequestParams(params, key);

      var sHtml = "<form id='alipaysubmit' name='alipaysubmit' action='" + this.alipay_gateway + "_input_charset=" + this.config['input_charset'].toLowerCase().trim() + "' method='" + method + "'>";

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(para)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _key = _step.value;

          var val = para[_key];
          sHtml += "<input type='hidden' name='" + _key + "' value='" + val + "'/>";
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

      sHtml = sHtml + "<input type='submit' value='" + button_name + "'></form>";

      sHtml = sHtml + "<script>document.forms['alipaysubmit'].submit();</script>";

      return sHtml;
    }
  }]);

  return AlipaySubmit;
}();

exports.default = AlipaySubmit;