const Querystring = require('querystring');
const { uriFormat } = require('./constants');

exports.adjustOptions = (data, opts, headers) => {
  let dataString, httpHeaders;
  const { key, token, json } = headers;

  if (opts.dataFormat === uriFormat) {
    dataString = Querystring.stringify(data);
    httpHeaders = [key, token];
  } else {
    dataString = JSON.stringify(data);
    httpHeaders = [key, token, json];
  }
  return { dataString, httpHeaders };
};

/**
  * Overwrites obj1's values with obj2's and adds
  * obj2's if non existent in obj1
  * @returns obj3 a new object based on obj1 and obj2
  */
exports.mergeOptions = (obj1, obj2) => {
  let obj3 = {};
  for (let attr1 in obj1) obj3[attr1] = obj1[attr1];
  for (let attr2 in obj2) obj3[attr2] = obj2[attr2];
  return obj3;
};

exports.assert = (condition, message = 'Assertion failed') => {
  if (!condition) {
    if (typeof Error !== 'undefined') throw new Error(message);
    throw message; // Fallback
  }
};

// Note that undefined == null.
// eslint-disable-next-line no-eq-null
exports.isDefAndNotNull = (val) => val != null;

exports.typeOf = o => ({}).toString.call(o)
  .match(/\s([a-zA-Z]+)/)[1].toLowerCase();
