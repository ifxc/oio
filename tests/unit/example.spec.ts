
import { expect } from 'chai';
import OiO from '@/index';
import Ajax from '@/xhr/xhr';

const url = 'https://1276840996828174.cn-shenzhen.fc.aliyuncs.com/2016-08-15/proxy/oio/restful/';
const params = { userId: 1, email: 'test@t.com' };
const data = { user: 'test', name: '测试' };
const timeout = 30000;

describe('example', () => {
  const oio = new OiO();

  it('简单案例', async () => {
    const ctx = oio.newCtx();
    const response = await ctx.setUrl(url).run();
    expect(response.data).to.have.nested.property('body', null);
  }).timeout(timeout);

  it('post请求案例', async () => {
    const ctx = oio.newCtx();
    // const response = await ctx.setUrl(url).setMethod('post').setData(data).setParam(params).run();
    const response = await ctx.setReq({ url, method: 'post', data, params }).run();
    expect(response.data).to.have.nested.property('queries.userId', params.userId + '');
    expect(response.data).to.have.nested.property('queries.email', params.email);
    expect(response.data).to.have.nested.property('body.user', data.user);
    expect(response.data).to.have.nested.property('body.name', data.name);
    expect(response.data).to.have.nested.property('method', 'POST');
  }).timeout(timeout);

  it('单独使用XHR', async () => {
    const response = await Ajax.get(url);
    expect(response.data).to.have.nested.property('body', null);
  }).timeout(timeout);

  it('用urlencoded格式', async () => {
    const ctx = oio.newCtx();
    const data = new URLSearchParams();
    data.append('param1', 'value1');
    const response = await ctx.setReq({
      url,
      data,
      method: 'post',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).run();
    expect(response.data).to.have.nested.property('body.param1', 'value1');
    if (response.data.headers) {
      expect(response.data.headers['content-type']).to.have.equal('application/x-www-form-urlencoded');
    }
  }).timeout(timeout);

  it('用中间件处理业务', async () => {
    const loading = { count: 0 };
    const api = { lock: false, status: 'wait' };
    const oio = new OiO();
    // Add common middleware data
    oio.setCtxData({
      error: { code: () => { console.error('code error') } },
      loading
    });

    // Add middleware
    oio.use(async function error(ctx, next) {
      const { error } = ctx.getCtxData();
      try {
        await next();
      } catch (err) {
        if (err.code && error) return error.code(); // code error handler
        // throw err;
      }
    });
    oio.use(async function apiLock(ctx, next) {
      const { api } = ctx.getCtxData();
      if (!api) return await next();
      api.lock = true;
      api.status = 'sending';
      try {
        await next();
      } catch (err) {
        throw err;
      } finally {
        api.lock = false;
        api.status = 'wait';
      }
    });
    oio.use(async function loading(ctx, next) {
      const { loading } = Object.getPrototypeOf(ctx).getCtxData();
      try {
        loading.count++;
        await next();
      } catch (err) {
        throw err;
      } finally {
        loading.count--;
      }
    });
    oio.use(async function intercept(ctx, next) {
      const { request, response } = ctx.getCtxData();
      // handler intercept request, for example:
      if (request && !request.data) throw new Error('No Data');
      await next();
      // handler intercept response, for example:
      if (response && response.status === 500) throw new Error('Server Error');
    });
    oio.use(async function transform(ctx, next) {
      const { request, response } = ctx.getCtxData();
      // handler request data
      await next();
      // handler response data
    });

    const ctx = oio.newCtx();
    // Add middleware ctx data
    ctx.setCtxData({ api });

    let apiCount = 3;
    const apiPromises = [];

    while (apiCount--) {
      apiPromises.push(ctx.setUrl('https://easy-mock.com/mock/5d567ba461a1c429de63dbc8/api/oio').setData({}).run());
    }
    await Promise.all(apiPromises);

    expect(loading).to.have.nested.property('count', 0);
    expect(api).to.have.nested.property('lock', false);
    expect(api).to.have.nested.property('status', 'wait');

  }).timeout(timeout);
});
