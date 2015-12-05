/**
 * Created on 12/6/15.
 */

import 'babel-polyfill';
import request from 'request';

const createQueryString = (params) => {

  let query = '';
  Object.keys(params).forEach(key => query += key + '=' + params[key] + '&');
  return query.substring(0, query.length - 1);
};

const filterParams = (params) => {

  Object.keys(params).forEach(key => {
    if (key === 'sign' || key === 'sign_type' || params[key] === '') {delete params[key];}
  });
  return params;
};

const sortParams = (params) => {

  const rst = {};
  Object.keys(params).sort().forEach(key => rst[key] = params[key]);
  return rst;
};

const fetch = (options) => new Promise(async (resolve, reject) => {

  await request(options, (error, response) => {

    if (error) {

      reject(error)
    } else {

      resolve(response);
    }
  });
});

fetch.get = (url) => new Promise(async (resolve, reject) => {

  await fetch({url: url}).then(resolve).catch(reject);
});

fetch.post = async (url, options) => new Promise(async (resolve, reject) => {

  Object.assign(options, {url: url, method: 'POST'});
  await fetch(options).then(resolve).catch(reject);
});

export default {
  createQueryString,
  filterParams,
  sortParams,
  fetch
};