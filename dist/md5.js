'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var md5Sign = function md5Sign(source, key) {
  return _crypto2.default.createHash('md5').update(source + key, 'utf8').digest('hex');
}; /**
    * Created on 12/3/15.
    */

var md5Verify = function md5Verify(source, key, sign) {
  return md5Sign(source, key) === sign;
};

exports.default = { md5Sign: md5Sign, md5Verify: md5Verify };