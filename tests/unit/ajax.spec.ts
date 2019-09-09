
import { expect } from 'chai';
import qs from 'qs';
import XR from '@/adapter/xhr';

const ajax = XR;
const url = 'https://1276840996828174.cn-shenzhen.fc.aliyuncs.com/2016-08-15/proxy/oio/restful/';
// const url = 'http://localhost:8000/2016-08-15/proxy/oio/restful/';
const params = { userId: 1, email: 'test@t.com' };
const data = { user: 'test', name: '测试' };
const timeout = 5000;

describe('adapter/xhr', () => {

  it('测试request方法', async () => {
    const response = await ajax.request({
      url,
      data,
      params,
      headers: {'Content-Type': 'application/json'},
      method: 'POST'
    });
    if (response.data) {
      expect(response.data.headers['content-type']).equal('application/json');
    }
    expect(response.data).to.have.nested.property('method', 'POST');
    expect(response.data).to.have.nested.property('queries.userId', params.userId + '');
    expect(response.data).to.have.nested.property('queries.email', params.email);
    expect(response.data).to.have.nested.property('body.user', data.user);
    expect(response.data).to.have.nested.property('body.name', data.name);
  }).timeout(timeout);

  it('测试get方法', async () => {
    const response = await ajax.get(url);
    expect(response.data).to.have.nested.property('method', 'GET');
    if (response.data) {
      expect(response.data.headers['content-type']).equal(undefined);
    }
    expect(response.data).to.have.nested.property('headers.accept', 'application/json, text/plain, *\/*');
  }).timeout(timeout);


  it('测试get方法的配置params & data', async () => {
    const response = await ajax.get(url, { params, data, accept: 'application/json' });
    // todo response.data未返回
    expect(response.data).to.have.nested.property('queries.userId', params.userId + '');
    expect(response.data).to.have.nested.property('queries.email', params.email);
    if (response.data) {
      expect(response.data.headers['content-type']).equal('application/json;charset=utf-8');
    }
  }).timeout(timeout);

  it('测试post方法的配置params & data', async () => {
    const response = await ajax.post(url, data, { params });
    expect(response.data).to.have.nested.property('queries.userId', params.userId + '');
    expect(response.data).to.have.nested.property('queries.email', params.email);
    expect(response.data).to.have.nested.property('body.user', data.user);
    expect(response.data).to.have.nested.property('body.name', data.name);
    if (response.data) {
      expect(response.data.headers['content-type']).equal('application/json;charset=utf-8');
    }
  }).timeout(timeout);

  it('测试post方法urlencoded下的配置params & data', async () => {
    const response = await ajax.post(url, qs.stringify(data, {arrayFormat: 'brackets'}),
      { params, headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
      );
    expect(response.data).to.have.nested.property('queries.userId', params.userId + '');
    expect(response.data).to.have.nested.property('queries.email', params.email);
    expect(response.data).to.have.nested.property('body.user', data.user);
    expect(response.data).to.have.nested.property('body.name', data.name);
    if (response.data) {
      expect(response.data.headers['content-type']).equal('application/x-www-form-urlencoded');
    }
  }).timeout(timeout);

  it('测试post方法multipart下的配置params & data[自动]', async () => {
    const formData = new FormData();
    formData.append('user', data.user);
    formData.append('name', data.name);
    const response = await ajax.post(url, formData, { params });
    expect(response.data).to.have.nested.property('queries.userId', params.userId + '');
    expect(response.data).to.have.nested.property('queries.email', params.email);
    expect(response.data).to.have.nested.property('body.user', data.user);
    expect(response.data).to.have.nested.property('body.name', data.name);
    if (response.data) {
      expect(response.data.headers['content-type']).match(/multipart\/form-data/);
    }
  }).timeout(timeout);

  it('测试post方法text、html、json下的params & data', async () => {
    const res1 = await ajax.post(url, data, { params, headers: {'Content-Type': 'application/json'} });
    expect(res1.data).to.have.nested.property('queries.userId', params.userId + '');
    expect(res1.data).to.have.nested.property('queries.email', params.email);
    expect(res1.data).to.have.nested.property('body.user', data.user);
    expect(res1.data).to.have.nested.property('body.name', data.name);
    if (res1.data) {
      expect(res1.data.headers['content-type']).to.have.equal('application/json');
    }

    const res2 = await ajax.post(url, 'test', { params, headers: {'Content-Type': 'text/plain'} });
    expect(res2.data).to.have.nested.property('queries.userId', params.userId + '');
    expect(res2.data).to.have.nested.property('queries.email', params.email);
    expect(res2.data).to.have.nested.property('body', 'test');
    if (res2.data) {
      expect(res2.data.headers['content-type']).to.have.equal('text/plain');
    }

    const res3 = await ajax.post(url, '<h1>Hello<h1/>', { params, headers: {'Content-Type': 'text/html'} });
    expect(res3.data).to.have.nested.property('queries.userId', params.userId + '');
    expect(res3.data).to.have.nested.property('queries.email', params.email);
    expect(res3.data).to.have.nested.property('body', '<h1>Hello<h1/>');
    if (res3.data) {
      expect(res3.data.headers['content-type']).to.have.equal('text/html');
    }

  }).timeout(timeout);

  it('测试put方法的配置params & data', async () => {
    const response = await ajax.put(url, data, { params });
    expect(response.data).to.have.nested.property('method', 'PUT');
    expect(response.data).to.have.nested.property('queries.userId', params.userId + '');
    expect(response.data).to.have.nested.property('queries.email', params.email);
    expect(response.data).to.have.nested.property('body.user', data.user);
    expect(response.data).to.have.nested.property('body.name', data.name);
    if (response.data) {
      expect(response.data.headers['content-type']).equal('application/json;charset=utf-8');
    }
  }).timeout(timeout);

  it('测试delete方法的配置params & data', async () => {
    const response = await ajax.delete(url, { params, data });
    expect(response.data).to.have.nested.property('method', 'DELETE');
    expect(response.data).to.have.nested.property('queries.userId', params.userId + '');
    expect(response.data).to.have.nested.property('queries.email', params.email);
    expect(response.data).to.have.nested.property('body.user', data.user);
    expect(response.data).to.have.nested.property('body.name', data.name);
    if (response.data) {
      expect(response.data.headers['content-type']).equal('application/json;charset=utf-8');
    }
  }).timeout(timeout);

  it('测试head方法的配置params & data', async () => {
    const response = await ajax.head(url, { params, data });
    expect(response.data).to.have.equal(null);
  }).timeout(timeout);

  it('测试options方法的配置params & data', async () => {
    const response = await ajax.options(url, { params, data });
    expect(response.data).to.have.equal(null);
  }).timeout(timeout);

  /*it('测试patch方法的配置params & data', async () => {
    const response = await ajax.patch(url, data, { params });
    expect(response.data).to.have.nested.property('method', 'PATCH');
    expect(response.data).to.have.nested.property('queries.userId', params.userId + '');
    expect(response.data).to.have.nested.property('queries.email', params.email);
    expect(response.data).to.have.nested.property('body.user', data.user);
    expect(response.data).to.have.nested.property('body.name', data.name);
    if (response.data) {
      expect(response.data.headers['content-type']).equal('application/json;charset=utf-8');
    }
  }).timeout(timeout);*/
});
