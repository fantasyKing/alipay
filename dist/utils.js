/**
 * Created on 12/6/15.
 */

'use strict';

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

/**
 * 为商户签名参数生成带引号 `query string`
 *
 * @param params
 * @returns {string}
 */
var createQueryString = function createQueryString(params) {

  var query = '';
  _Object$keys(params).forEach(function (key) {
    return query += key + '="' + params[key] + '"&';
  });
  return query.substring(0, query.length - 1);
};

/**
 * 为`notify_url` `return_url` 验签生成无引号的 `query string`
 *
 * @param params
 * @returns {string}
 */
var createQueryStringWithoutQuote = function createQueryStringWithoutQuote(params) {
  var query = '';
  _Object$keys(params).forEach(function (key) {
    return query += key + '=' + params[key] + '&';
  });
  return query.substring(0, query.length - 1);
};

/**
 * 过滤掉签名或验签时不需要的参数, 包括 `sign`, `sign_type` 以及值为空的参数
 *
 * @param params
 * @returns {{}}
 */
var filterParams = function filterParams(params) {

  var rst = {};
  _Object$keys(params).forEach(function (key) {
    if (!(key === 'sign' || key === 'sign_type' || params[key] === '' || typeof params[key] === 'undefined')) {

      rst[key] = params[key];
    }
  });
  return rst;
};

/**
 * 对参数进行升序排序
 *
 * @param params
 * @returns {{}}
 */
var sortParams = function sortParams(params) {

  var rst = {};
  _Object$keys(params).sort().forEach(function (key) {
    return rst[key] = params[key];
  });
  return rst;
};

var fetch = function fetch(options) {
  return new _Promise(function (resolve, reject) {

    try {

      (0, _request2['default'])(options, function (error, response) {

        if (error) {

          reject(error);
        } else {

          resolve(response);
        }
      });
    } catch (e) {

      reject(e);
    }
  });
};

fetch.get = function (url, options) {
  return new _Promise(function (resolve, reject) {

    var opt = {};
    if (typeof options === 'object') {

      _Object$assign(opt, options, { url: url, method: 'GET' });
    } else {

      opt = { url: url, method: 'GET' };
    }
    fetch(opt).then(resolve)['catch'](reject);
  });
};

fetch.post = function (url, options) {
  return new _Promise(function (resolve, reject) {

    var opt = {};
    if (typeof options === 'object') {

      _Object$assign(opt, options, { url: url, method: 'POST' });
    } else {

      opt = { url: url, method: 'POST' };
    }
    fetch(opt).then(resolve)['catch'](reject);
  });
};

var Log = function Log(enable) {

  if (process.env.NODE_ENV === 'production') {

    return function () {};
  }
  return enable ? function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    console.log.apply(console, args);
  } : function () {};
};

exports['default'] = {
  createQueryStringWithoutQuote: createQueryStringWithoutQuote,
  createQueryString: createQueryString,
  filterParams: filterParams,
  sortParams: sortParams,
  fetch: fetch,
  Log: Log
};
module.exports = exports['default'];