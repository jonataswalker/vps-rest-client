# vps-rest-client
A Node.js REST client for VPS admin.
This is a wrapper around [node-libcurl](https://github.com/JCMais/node-libcurl) focusing on consuming VPS REST API.

### Install
```npm i [-g] vps-rest-client```

### Example
```javascript
const Client = require('vps-rest-client');

var host = 'https://api.linode.com/v4/domains';
var token = '....';
var domain = 'foo-domain.com';
var post = { domain: 'mynewdomain2.com' };
var change = { soa_email: 'newemail@example.com' };

const client = new Client(token);

client.GET(host)
  .then(res => res.data.find(o => o.domain === domain).id)
  .then(id => client.POST(`${host}/${id}/clone`, post))
  .then(res => res.id)
  .then(id => client.PUT(`${host}/${id}`, change))
  .then(res => res.id)
  .then(id => client.DELETE(`${host}/${id}`))
  .then(console.log)
  .catch(console.log);
```

## Friendly response
All methods convert the reply from REST API into a **JavaScript Object**.
That way you can interact with the responses using JavaScript syntax.

# API

## Constructor

#### `new Client(token, options)`
`@param {String} token` API required token or key.

`@param {Object|undefined} options` An object with the following possible properties:
* `dataFormat`: *`'JSON'`*; The API (payload) data format, could be *`'URI'`*
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

#### client.delete(url)
`@param {String} url` API url.
Returns a promise for the request.
