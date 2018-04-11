import { serial as test } from 'ava';
import Client from '.';

var host = 'https://api.linode.com/v4/domains';
var token = '...';
var domain = 'foo-domain.com';
var post = { domain: 'foo-domain2.com' };
var change = { soa_email: 'newemail@example.com' };

test('GET', async t => {
  const client = new Client(token);
  const res = await client.GET(host);

  t.truthy(res.data.length);
});

test('POST', async t => {
  const client = new Client(token);
  const res = await client.GET(host);
  const id = res.data.find(o => o.domain === domain).id;
  const postRes = await client.POST(`${host}/${id}/clone`, post);

  t.is(postRes.domain, post.domain);
});

test('PUT', async t => {
  const client = new Client(token);
  const res = await client.GET(host);
  const id = res.data.find(o => o.domain === post.domain).id;
  const resPut = await client.PUT(`${host}/${id}`, change);

  t.is(resPut.soa_email, change.soa_email);
});

test('DELETE', async t => {
  const client = new Client(token);
  const res = await client.GET(host);
  const id = res.data.find(o => o.domain === post.domain).id;

  await client.DELETE(`${host}/${id}`);
  const getById = await client.GET(`${host}/${id}`);

  t.false('id' in getById);
});
