'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                              * Created on 12/6/15.
                                                                                                                                                                                                                                                                                                                                                                                                                                                              */

var createQueryString = function createQueryString(params) {

  var query = '';
  Object.keys(params).forEach(function (key) {
    return query += key + '=' + params[key] + '&';
  });
  return query.substring(0, query.length - 1);
};

var filterParams = function filterParams(params) {

  var rst = {};
  Object.keys(params).forEach(function (key) {
    if (!(key === 'sign' || key === 'sign_type' || params[key] === '')) {
      rst[key] = params[key];
    }
  });
  return rst;
};

var sortParams = function sortParams(params) {

  var rst = {};
  Object.keys(params).sort().forEach(function (key) {
    return rst[key] = params[key];
  });
  return rst;
};

var fetch = function fetch(options) {
  return new Promise(function (resolve, reject) {

    try {

      (0, _request2.default)(options, function (error, response) {

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
  return new Promise((function () {
    var _this = this;

    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(resolve, reject) {
      var opt;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              opt = {};

              if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {

                Object.assign(opt, options, { url: url, method: 'GET' });
              } else {

                opt = { url: url, method: 'GET' };
              }
              _context.next = 4;
              return fetch(opt).then(resolve).catch(reject);

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x, _x2) {
      return ref.apply(this, arguments);
    };
  })());
};

fetch.post = (function () {
  var _this3 = this;

  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(url, options) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt('return', new Promise((function () {
              var _this2 = this;

              var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(resolve, reject) {
                var opt;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        opt = {};

                        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {

                          Object.assign(opt, options, { url: url, method: 'POST' });
                        } else {

                          opt = { url: url, method: 'POST' };
                        }
                        _context2.next = 4;
                        return fetch(opt).then(resolve).catch(reject);

                      case 4:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, _this2);
              }));

              return function (_x5, _x6) {
                return ref.apply(this, arguments);
              };
            })()));

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this3);
  }));

  return function (_x3, _x4) {
    return ref.apply(this, arguments);
  };
})();

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

exports.default = {
  createQueryString: createQueryString,
  filterParams: filterParams,
  sortParams: sortParams,
  fetch: fetch,
  Log: Log
};