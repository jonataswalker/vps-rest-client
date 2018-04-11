const Client = require('../');

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
