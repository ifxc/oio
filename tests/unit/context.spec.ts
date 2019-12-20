
import { expect } from 'chai';
import Context from '@/core/context';
import request from '@/data/request';
import response from '@/data/response';
import XHR from '@/xhr/xhr';

describe('core/context', () => {
  it('Context静态方法', () => {
    expect(Context.newReq()).to.has.deep.equal(request);
    expect(Context.newRes()).to.has.deep.equal(response);
  });

  it('Context实例创建', () => {
    const context1 = new Context();
    const context2 = new Context({ method: 'post' });
    const context3 = new Context({ url: '/test' }, { loading: { count: 0} });
    const context4 = new Context(
      { data: { msg: 'this a test' } },
      { lock: false },
      { jquery: {}, xhr: XHR }
      );

    expect(context1.getCtxData()).to.has.deep.equal({});
    expect(context1.extend).to.has.deep.equal({});
    expect(context1.xhr).to.has.deep.equal(null);
    expect(context1.getReq()).to.has.deep.equal(request);
    expect(context1.getRes()).to.has.deep.equal(response);

    expect(context2.getCtxData()).to.has.deep.equal({});
    expect(context2.extend).to.has.deep.equal({});
    expect(context2.xhr).to.has.deep.equal(null);
    expect(context2.getReq()).to.has.deep.property('method', 'post');

    expect(context3.getCtxData()).to.has.deep.equal({loading: { count: 0}});
    expect(context3.extend).to.has.deep.equal({});
    expect(context3.xhr).to.has.deep.equal(null);
    expect(context3.getReq()).to.has.deep.property('url', '/test');

    expect(context4.getCtxData().lock).to.has.equal(false);
    expect(context4.extend.jquery).to.has.deep.equal({});
    expect(context4.xhr).to.has.property('request');
    expect(context4.getReq().data).to.has.deep.property('msg', 'this a test');

  });

  it('newCtx方法测试', () => {
    const context = new Context();
    const ctx = context.newCtx();

    expect(ctx.getCtxData()).to.has.deep.equal({});
    expect(ctx.getRes()).to.has.deep.equal(context.getRes());
    expect(ctx.getReq()).to.has.deep.equal(request);

    ctx.setReq({ method: 'post', url: '/test' });
    expect(ctx.getReq()).to.has.deep.property('method', 'post');
    expect(context.getReq()).to.has.deep.property('method', 'get');
  });

  it('setCtxData/getCtxData', () => {
    const context = new Context({}, { lock: false,  }, {});
    context.setCtxData({loading: { count: 0 }});
    const ctx = context.newCtx();
    ctx.setCtxData({ error: false, lock: true });

    expect(context.getCtxData()).to.has.deep.property('lock', false);
    expect(context.getCtxData()).to.has.deep.property('loading', { count: 0 });
    expect(context.getCtxData()).to.not.has.property('error', false);
    expect(ctx.getCtxData()).to.has.deep.property('lock', true);
    expect(ctx.getCtxData()).to.has.deep.property('error', false);

    let { loading } = context.getCtxData();
    loading.count++;
    expect(context.getCtxData()).to.has.deep.property('loading', { count: 1 });

  });

  it('setRes/getRes', () => {
    const context = new Context();
    const ctx = context.newCtx();

    context.setRes({ data: { count: 0 } });
    ctx.setRes({ data: { lock: false} });

    expect(context.getRes()).to.has.deep.property('data', { count: 0 });
    expect(ctx.getRes()).to.has.deep.property('data', { lock: false});

  });

  it('setReq/getReq', () => {
    const context = new Context({ method: 'put', headers: { 'Content-Type': 'text/html', t: 1 } });
    const ctx = context.newCtx();

    ctx.setReq({ headers: { 'Content-Type': 'text/plain' }, url: '/test' });

    expect(context.getReq()).to.has.deep.property('method', 'put');
    expect(context.getReq()).to.has.deep.property('headers', {
      'Content-Type': 'text/html',
      Accept: 'application/json, text/plain, */*',
      t: 1
    });
    expect(context.getCtxData()).to.not.has.property('url', '/test');
    expect(ctx.getReq()).to.has.deep.property('method', 'put');
    expect(ctx.getReq()).to.has.deep.property('headers', {
      'Content-Type': 'text/plain',
      Accept: 'application/json, text/plain, */*',
      t: 1 });

  });

  it('setUrl', () => {
    const context = new Context({ url: '/test' });
    const ctx = context.newCtx();
    expect(ctx.getReq()).to.has.deep.property('url', '/test');
    ctx.setUrl('/test2');
    expect(ctx.getReq()).to.has.deep.property('url', '/test2');
    expect(context.getReq()).to.has.deep.property('url', '/test');
  });

  it('setMethod', () => {
    const context = new Context({ method: 'put' });
    const ctx = context.newCtx();
    expect(ctx.getReq()).to.has.deep.property('method', 'put');
    ctx.setMethod('post');
    expect(ctx.getReq()).to.has.deep.property('method', 'post');
    expect(context.getReq()).to.has.deep.property('method', 'put');
  });

  it('setData', () => {
    const context = new Context({ data: { a: 1 } });
    const ctx = context.newCtx();
    expect(ctx.getReq()).to.has.deep.property('data', { a: 1 });
    ctx.setData({ a: 2, b:1 });
    expect(ctx.getReq()).to.has.deep.property('data', { a: 2, b: 1 });
    expect(context.getReq()).to.has.deep.property('data', { a: 1 });
  });

  it('setParams', () => {
    const context = new Context({ params: { a: 1 } });
    const ctx = context.newCtx();
    expect(ctx.getReq()).to.has.deep.property('params', { a: 1 });
    ctx.setParams({ a: 2, b:1 });
    expect(ctx.getReq()).to.has.deep.property('params', { a: 2, b: 1 });
    expect(context.getReq()).to.has.deep.property('params', { a: 1 });
  });

  it('setHeaders', () => {
    const context = new Context({ headers: { 'Content-Type': 'text/html' } });
    const ctx = context.newCtx();
    expect(ctx.getReq()).to.has.deep.property('headers', {
      'Content-Type': 'text/html',
      Accept: 'application/json, text/plain, */*'
    });
    ctx.setHeaders({ Accept: '*/*' });
    expect(ctx.getReq()).to.has.deep.property('headers', {
      'Content-Type': 'text/html',
      Accept: '*/*'
    });
    expect(context.getReq()).to.has.deep.property('headers', {
      'Content-Type': 'text/html',
      Accept: 'application/json, text/plain, */*'
    });
  });

  it('链式调用', () => {
    const context = new Context();
    const ctx = context.newCtx();
    ctx.setUrl('/test')
      .setMethod('post')
      .setData({ msg: 'hi' })
      .setParams({ q: 1 })
      .setHeaders({ 'Content-Type': 'text/html' })

    expect(ctx.getReq()).to.has.deep.property('url', '/test');
    expect(ctx.getReq()).to.has.deep.property('method', 'post');
    expect(ctx.getReq()).to.has.deep.property('data', { msg: 'hi' });
    expect(ctx.getReq()).to.has.deep.property('params', { q: 1 });
    expect(ctx.getReq()).to.has.deep.property('headers', {
      'Content-Type': 'text/html',
      Accept: 'application/json, text/plain, */*'
    });
  });

  it('中间件功能测试', async () => {
    const context = new Context();
    const ctx = context.newCtx();

    const list: number[] = [];
    context.use(async function t1(ctx, next) {
      list.push(1);
      await next();
      list.push(6);
    });
    context.use(async function t2(ctx, next) {
      list.push(2);
      await next();
      list.push(5);
    });
    context.use(async function t3(ctx, next) {
      list.push(3);
      await next();
      list.push(4);
    });

    const { data } = await ctx.run(async function test (ctx, next) {
      await next();
      ctx.setRes({ data: { msg: 'hi' } })
    });

    expect(data).to.has.deep.property('msg', 'hi');
    expect(list).to.has.deep.equal([1, 2, 3, 4, 5, 6]);
  });
});
