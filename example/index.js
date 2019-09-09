
import Vue from 'vue';
import OiO from '../src/index';

// For loading middleware test, No must
const app = new Vue({
  data: function () {
    return { loading: { count: 0 }, api: { lock: false, status: 'wait' } }
  }
});
app.$watch('loading', {
  handler: function (newValue, oldValue) {
    console.log('loading', newValue, oldValue);
  },
  deep: true
})
app.$watch('api', {
  handler: function (newValue, oldValue) {
    console.log('api', newValue, oldValue);
  },
  deep: true
})


const oio = new OiO();
// Add common middleware data
oio.setCtxData({
  error: { code: () => { console.error('code error') } },
  loading: app.loading
});

// Add middleware
oio.use(async function error(ctx, next) {
  const { error } = ctx.getCtxData();
  try {
    await next();
  } catch (err) {
    if (err.code && error) return error.code(); // code error handler
    throw err;
  }
});
oio.use(async function apiLock(ctx, next) {
  const { api } = ctx.getCtxData();
  if (!api) return await next();
  if (api.lock) {
    throw new Error('api lock');
  } else {
    api.lock = true;
    api.status = 'sending';
    try {
      await next();
    } catch (err) {
      throw err;
    }
    api.lock = false;
    api.status = 'wait';
  }
});
oio.use(async function loading(ctx, next) {
  const { loading } = ctx.parent.getCtxData();
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

function getData (ctxData) {
  const ctx = oio.newCtx();
  // Add middleware ctx data
  ctx.setCtxData(ctxData);
  ctx.setUrl('https://easy-mock.com/mock/5d567ba461a1c429de63dbc8/api/oio').setData({}).run().then(response => {
    console.log(response)
  }).catch(error => {
    console.log(error);
  });
}

getData({ api: app.api });
