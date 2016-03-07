/**
 * Created on 12/6/15.
 */

import request from 'request';

/**
 * 为商户签名参数生成带引号 `query string`
 *
 * @param params
 * @returns {string}
 */
const createQueryString = (params) => {

  let query = '';
  Object.keys(params).forEach(key => query += key + '="' + params[key] + '"&');
  return query.substring(0, query.length - 1);
};

/**
 * 为`notify_url` `return_url` 验签生成无引号的 `query string`
 *
 * @param params
 * @returns {string}
 */
const createQueryStringWithoutQuote = (params) => {
  let query = '';
  Object.keys(params).forEach(key => query += key + '=' + params[key] + '&');
  return query.substring(0, query.length - 1);
};

/**
 * 过滤掉签名或验签时不需要的参数, 包括 `sign`, `sign_type` 以及值为空的参数
 *
 * @param params
 * @returns {{}}
 */
const filterParams = (params) => {

  const rst = {};
  Object.keys(params).forEach(key => {
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
const sortParams = (params) => {

  const rst = {};
  Object.keys(params).sort().forEach(key => rst[key] = params[key]);
  return rst;
};

const fetch = (options) => new Promise((resolve, reject) => {

  try {

    request(options, (error, response) => {

      if (error) {

        reject(error)
      } else {

        resolve(response);
      }
    });
  } catch(e) {

    reject(e);
  }
});

fetch.get = (url, options) => new Promise((resolve, reject) => {

  let opt = {};
  if (typeof options === 'object') {

    Object.assign(opt, options, {url: url, method: 'GET'});
  } else {

    opt = {url: url, method: 'GET'};
  }
  fetch(opt).then(resolve).catch(reject);
});

fetch.post = (url, options) => new Promise((resolve, reject) => {

  let opt = {};
  if (typeof options === 'object') {

    Object.assign(opt, options, {url: url, method: 'POST'});
  } else {

    opt = {url: url, method: 'POST'};
  }
  fetch(opt).then(resolve).catch(reject);
});

const Log = (enable) => {

  if (process.env.NODE_ENV === 'production') {

    return () => {};
  }
  return enable ? (...args) => {console.log.apply(console, args)} : () => {};
};

export default {
  createQueryStringWithoutQuote,
  createQueryString,
  filterParams,
  sortParams,
  fetch,
  Log
};