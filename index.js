'use strict';

var util = require('util');
var utils = require('./utils');
var Curl = require('node-libcurl').Curl;
var querystring = require('querystring');

// Export createClient method
module.exports.createClient = function(key, options) {
  return new Client(key, options);
};

function Client(key, opt_options) {
  Curl.apply(this);
  
  var defaults = {
    verbose: true
  };
  this.options = utils.mergeOptions(defaults, opt_options);
  
  this.httpheaders = {
    key: 'X-API-KEY: ' + key,
    del: 'X-HTTP-Method-Override: DELETE',
    put: 'X-HTTP-Method-Override: PUT'
  };
  
  this.setOpt(Curl.option.SSL_VERIFYHOST, 0);
  this.setOpt(Curl.option.SSL_VERIFYPEER, 0);
  this.setOpt(Curl.option.VERBOSE, this.options.verbose);
}
util.inherits(Client, Curl);

Client.prototype.get = Client.prototype.GET = function(url) {
  var self = this;
  
  utils.assert(utils.isDefAndNotNull(url), '@param `url` must be informed.');
  
  this.setOpt(Curl.option.URL, url);
  
  // necessary if reusing connection
  this.setOpt(Curl.option.CUSTOMREQUEST, 'GET');
  this.setOpt(Curl.option.HTTPHEADER, [this.httpheaders.key]);
  
  this.perform();
  
  return new Promise(function(resolve, reject) {
    self.on('end', function (statusCode, body, headers) {
      resolve(JSON.parse(body));
    });
    self.on('error', function(err, errCode) {
      reject(JSON.parse(err));
    });
  });
};

Client.prototype.post = Client.prototype.POST = function(url, data) {
  var self = this;
  
  utils.assert(utils.isDefAndNotNull(url), '@param `url` must be informed.');
  utils.assert(utils.typeOf(data) === 'object', '@param `data` must be an Object.');
  
  data = querystring.stringify(data);
  this.setOpt(Curl.option.URL, url);
  this.setOpt(Curl.option.POSTFIELDS, data);
  this.setOpt(Curl.option.CUSTOMREQUEST, 'POST');
  this.setOpt(Curl.option.HTTPHEADER, [this.httpheaders.key]);
  this.perform();
  
  return new Promise(function(resolve, reject) {
    self.on('end', function (statusCode, body, headers) {
      resolve(JSON.parse(body));
    });
    self.on('error', function(err, errCode) {
      reject(JSON.parse(err));
    });
  });
};

Client.prototype.put = Client.prototype.PUT = function(url, data) {
  var self = this;
  
  utils.assert(utils.isDefAndNotNull(url), '@param `url` must be informed.');
  utils.assert(utils.typeOf(data) === 'object', '@param `data` must be an Object.');
  
  data = querystring.stringify(data);
  this.setOpt(Curl.option.URL, url);
  this.setOpt(Curl.option.POSTFIELDS, data);
  this.setOpt(Curl.option.CUSTOMREQUEST, 'PUT');
  this.setOpt(Curl.option.HTTPHEADER, [this.httpheaders.key, this.httpheaders.put]);
  this.perform();
  
  return new Promise(function(resolve, reject) {
    self.on('end', function (statusCode, body, headers) {
      resolve(JSON.parse(body));
    });
    self.on('error', function(err, errCode) {
      reject(JSON.parse(err));
    });
  });
};

Client.prototype.delete = Client.prototype.DELETE = function(url, data) {
  var self = this;
  
  utils.assert(utils.isDefAndNotNull(url), '@param `url` must be informed.');
  utils.assert(utils.typeOf(data) === 'object', '@param `data` must be an Object.');
  
  data = querystring.stringify(data);
  this.setOpt(Curl.option.URL, url);
  this.setOpt(Curl.option.POSTFIELDS, data);
  this.setOpt(Curl.option.CUSTOMREQUEST, 'DELETE');
  this.setOpt(Curl.option.HTTPHEADER, [this.httpheaders.key, this.httpheaders.del]);
  this.perform();
  
  return new Promise(function(resolve, reject) {
    self.on('end', function (statusCode, body, headers) {
      resolve(JSON.parse(body));
    });
    self.on('error', function(err, errCode) {
      reject(JSON.parse(err));
    });
  });
};
