/**
 * Created on 12/6/15.
 */

import request from 'request';

const createQueryString = (params) => {

  let query = '';
  Object.keys(params).forEach(key => query += key + '="' + params[key] + '"&');
  return query.substring(0, query.length - 1);
};

const filterParams = (params) => {

  const rst = {};
  Object.keys(params).forEach(key => {
    if (!(key === 'sign' || key === 'sign_type' || params[key] === '' || typeof params[key] === 'undefined')) {

      rst[key] = params[key];
    }
  });
  return rst;
};

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

fetch.get = (url, options) => new Promise(async (resolve, reject) => {

  let opt = {};
  if (typeof options === 'object') {

    Object.assign(opt, options, {url: url, method: 'GET'});
  } else {

    opt = {url: url, method: 'GET'};
  }
  await fetch(opt).then(resolve).catch(reject);
});

fetch.post = async (url, options) => new Promise(async (resolve, reject) => {

  let opt = {};
  if (typeof options === 'object') {

    Object.assign(opt, options, {url: url, method: 'POST'});
  } else {

    opt = {url: url, method: 'POST'};
  }
  await fetch(opt).then(resolve).catch(reject);
});

const Log = (enable) => {

  if (process.env.NODE_ENV === 'production') {

    return () => {};
  }
  return enable ? (...args) => {console.log.apply(console, args)} : () => {};
};

export default {
  createQueryString,
  filterParams,
  sortParams,
  fetch,
  Log
};