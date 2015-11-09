# vps-rest-client
A Node.js REST client for VPS admin.
This is a wrapper around [node-libcurl](https://github.com/JCMais/node-libcurl) focusing on consuming VPS REST API.

### Install
```npm install vps-rest-client```

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

###### `key` API required key

###### `options` is an object with the following possible properties:
* `verbose`: *true*;

## Methods
The commands can be specified in uppercase or lowercase for convenience. `client.get()` is the same as `client.GET()`.

#### client.get(url)
Returns a promise for the request.

#### client.post(url, data)
@param {Object} data Data.
Returns a promise for the request.

#### client.put(url, data)
@param {Object} data Data.
Returns a promise for the request.

#### client.delete(url, data)
@param {Object} data Data.
Returns a promise for the request.
