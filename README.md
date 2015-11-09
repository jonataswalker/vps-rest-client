# vps-rest-client
A Node.js REST client for VPS admin.
This is a wrapper around [node-libcurl](https://github.com/JCMais/node-libcurl) focusing on consuming VPS REST API.

### Install
```[sudo] npm install [-g] vps-rest-client```

### Simple GET
```javascript
var host = 'https://api.budgetvm.com/v2/dns/record';
var key = 'some___key';
var domain_id = 'some___id';

var rest = require('vps-rest-client');
var client = rest.createClient(key, {
  verbose: false
});

client.get(host + '/' + domain_id).then(function(response) {
  console.info(response);
  client.close();
}, function(error) {
  console.info(error);
});

```

### Make a POST and when done, make a GET
```javascript
var post = {
  domain: domain_id,
  record: 'test.example.net',
  type: 'A',
  content: '111.111.111.111'
};

client.post(host, post).then(function(resp) {
  console.info(resp);
  
  if (resp.success === true) {
    client.get(host + '/' + domain_id).then(function(response) {
      console.info(response);
      client.close();
    }, function(error) {
      console.info(error);
    });
  } else {
    client.close();
  }
}, function(error) {
  console.info(error);
});

```

## Friendly response
All methods convert the reply from REST API into a **JavaScript Object**.
That way you can interact with the responses using JavaScript syntax.

# API

## Constructor

#### `createClient(key, options)`
`@param {String} key` API required key.

`@param {Object|undefined} options` An object with the following possible properties:
* `verbose`: *`true`*

## Methods
The commands can be specified in uppercase or lowercase for convenience. `client.get()` is the same as `client.GET()`.

#### client.get(url)
`@param {String} url` API url.
Returns a promise for the request.

#### client.post(url, data)
`@param {String} url` API url.
`@param {Object} data` Data to be posted.
Returns a promise for the request.

#### client.put(url, data)
`@param {String} url` API url.
`@param {Object} data` Data to be posted.
Returns a promise for the request.

#### client.delete(url, data)
`@param {String} url` API url.
`@param {Object} data` Data to be posted.
Returns a promise for the request.


## Change Log

### upcoming (2015/11/09 11:43 +00:00)
- [f51ccfe](https://github.com/jonataswalker/vps-rest-client/commit/f51ccfe899dcfbc579a7d81d0f0173814873c909) Bump v0.1.3 (@jonataswalker)

### 0.1.3 (2015/11/09 10:37 +00:00)
- [dc8f2a0](https://github.com/jonataswalker/vps-rest-client/commit/dc8f2a005bbfd62dfaca675423ce3fddbc6e0a28) Add some more description. (@jonataswalker)
- [c4935a9](https://github.com/jonataswalker/vps-rest-client/commit/c4935a982f538fd343f77c11818f28d68d8c0c7c) Added method docs (@jonataswalker)
- [6d73ab3](https://github.com/jonataswalker/vps-rest-client/commit/6d73ab332be243c194f9850080ba47306ebc1491) Add some more description. (@jonataswalker)
- [a9bab00](https://github.com/jonataswalker/vps-rest-client/commit/a9bab00e04da177ab66364c8fe72787e9aed4b28) Add some more description. (@jonataswalker)

### 0.1.2 (2015/11/08 20:08 +00:00)
- [ed08054](https://github.com/jonataswalker/vps-rest-client/commit/ed08054740fa6993a75f43a636b13c1a084992b9) Adjust package.json (@jonataswalker)

### 0.1.1 (2015/11/08 19:58 +00:00)
- [7305961](https://github.com/jonataswalker/vps-rest-client/commit/73059619772414b4ed79cf5c16a71c8295fac4e2) Adjust package.json (@jonataswalker)
- [e063f64](https://github.com/jonataswalker/vps-rest-client/commit/e063f64e85768617ee922849025f3c492b7ab84d) Adjust package.json (@jonataswalker)
- [aa02467](https://github.com/jonataswalker/vps-rest-client/commit/aa02467edc040fd49cdf03f5cd7f813f0a2f9e73) Add some more description. (@jonataswalker)
- [5499711](https://github.com/jonataswalker/vps-rest-client/commit/54997115eb512f53caa28523ae5ca72394e82dfb) Initial release (@jonataswalker)

### 0.1.0 (2015/11/07 12:48 +00:00)
- [54857f7](https://github.com/jonataswalker/vps-rest-client/commit/54857f7aa176e617ce30f1c588bceef6342fcc83) Update README.md (@jonataswalker)
- [de40b52](https://github.com/jonataswalker/vps-rest-client/commit/de40b52e001d6debc1c06f01570daec7a9e99a80) Initial commit (@jonataswalker)