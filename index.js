const { Curl } = require('node-libcurl');
const { jsonFormat } = require('./constants');
const {
  adjustOptions,
  mergeOptions,
  assert,
  isDefAndNotNull,
  typeOf
} = require('./helpers');

/**
 * Wrapper class around node-libcurl.
 * @extends Curl
 * @param {String} key API required key.
 * @param {Object|undefined} opt_options Options.
 */

module.exports = class Client extends Curl {
  constructor(key, opt_options) {
    super();

    if (!(this instanceof Client)) return new Client(key, opt_options);

    const defaults = { dataFormat: jsonFormat, verbose: false };
    this.options = mergeOptions(defaults, opt_options);

    this.httpHeaders = {
      json: 'Content-Type: application/json',
      token: `Authorization: Bearer ${key}`,
      key: `X-API-KEY: ${key}`,
      del: 'X-HTTP-Method-Override: DELETE',
      put: 'X-HTTP-Method-Override: PUT'
    };

    this.setOpt(Curl.option.SSL_VERIFYHOST, 0);
    this.setOpt(Curl.option.SSL_VERIFYPEER, 0);
    this.setOpt(Curl.option.VERBOSE, this.options.verbose);

    /* Methods aliases */
    this.GET = this.get;
    this.POST = this.post;
    this.PUT = this.put;
    this.DELETE = this.delete;
  }

  /**
  * Makes a GET request and returns a promise.
  * This promise will be resolved when the API response is available.
  * @param {String} url API url.
  * @return {Promise.prototype.then(onFulfilled, onRejected)}
  */
  get(url) {
    assert(isDefAndNotNull(url), '@param `url` must be informed.');

    const { key, token } = this.httpHeaders;
    this.setOpt(Curl.option.URL, url);
    // necessary if reusing connection
    this.setOpt(Curl.option.CUSTOMREQUEST, 'GET');
    this.setOpt(Curl.option.HTTPHEADER, [key, token]);
    this.perform();

    return new Promise((resolve, reject) => {
      this.on('end', (statusCode, body) => resolve(JSON.parse(body)));
      this.on('error', (err, errCode) => reject(JSON.parse(err)));
    });
  }

  /**
  * Makes a POST request and returns a promise.
  * This promise will be resolved when the API response is available.
  * @param {String} url API url.
  * @param {Object} data Data to be posted.
  * @return {Promise.prototype.then(onFulfilled, onRejected)}
  */
  post(url, data) {
    assert(isDefAndNotNull(url), '@param `url` must be informed.');
    assert(typeOf(data) === 'object', '@param `data` must be an Object.');

    const {
      dataString,
      httpHeaders
    } = adjustOptions(data, this.options, this.httpHeaders);

    this.setOpt(Curl.option.URL, url);
    this.setOpt(Curl.option.POSTFIELDS, dataString);
    this.setOpt(Curl.option.CUSTOMREQUEST, 'POST');
    this.setOpt(Curl.option.HTTPHEADER, httpHeaders);
    this.perform();

    return new Promise((resolve, reject) => {
      this.on('end', (statusCode, body) => resolve(JSON.parse(body)));
      this.on('error', (err, errCode) => reject(JSON.parse(err)));
    });
  }

  /**
  * Makes a PUT request and returns a promise.
  * This promise will be resolved when the API response is available.
  * @param {String} url API url.
  * @param {Object} data Data to be posted.
  * @return {Promise.prototype.then(onFulfilled, onRejected)}
  */
  put(url, data) {
    assert(isDefAndNotNull(url), '@param `url` must be informed.');
    assert(typeOf(data) === 'object', '@param `data` must be an Object.');

    let {
      dataString,
      httpHeaders
    } = adjustOptions(data, this.options, this.httpHeaders);

    httpHeaders.push(this.httpHeaders.put);

    this.setOpt(Curl.option.URL, url);
    this.setOpt(Curl.option.POSTFIELDS, dataString);
    this.setOpt(Curl.option.CUSTOMREQUEST, 'PUT');
    this.setOpt(Curl.option.HTTPHEADER, httpHeaders);
    this.perform();

    return new Promise((resolve, reject) => {
      this.on('end', (statusCode, body) => resolve(JSON.parse(body)));
      this.on('error', (err, errCode) => reject(JSON.parse(err)));
    });
  }

  /**
  * Makes a DELETE request and returns a promise.
  * This promise will be resolved when the API response is available.
  * @param {String} url API url.
  * @return {Promise.prototype.then(onFulfilled, onRejected)}
  */
  delete(url) {
    assert(isDefAndNotNull(url), '@param `url` must be informed.');

    const { key, token, del } = this.httpHeaders;

    this.setOpt(Curl.option.URL, url);
    this.setOpt(Curl.option.CUSTOMREQUEST, 'DELETE');
    this.setOpt(Curl.option.HTTPHEADER, [key, token, del]);
    this.perform();

    return new Promise((resolve, reject) => {
      this.on('end', (statusCode, body) => resolve(JSON.parse(body)));
      this.on('error', (err, errCode) => reject(JSON.parse(err)));
    });
  }
};
