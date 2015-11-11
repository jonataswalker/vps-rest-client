var host = 'https://api.budgetvm.com/v2/dns/record';
var key = '...';
var domain_id = '...';

var rest = require('vps-rest-client');
var client = rest.createClient(key, {
  verbose: false
});

var post = {
  domain: domain_id,
  record: 'test.example.net',
  type: 'A',
  content: '111.111.111.111'
};

// POST a new record and when done ... list all records
client.POST(host, post).then(function(resp) {
  console.info(resp);
  
  if (resp.success === true) {
    client.get(host + '/' + domain_id).then(function(response) {
      console.info(response);
      client.close();
    });
  } else {
    client.close();
  }
}).catch((err) => console.info(err));