
import { expect } from 'chai';
import OiO from '@/index';

const url = 'https://1276840996828174.cn-shenzhen.fc.aliyuncs.com/2016-08-15/proxy/oio/restful/';
const timeout = 20000;

describe('oio', () => {

  it('默认请求测试', async () => {
    const data = { user: 'xx', name: 'hh' };
    const params = { id: '1', email: '123@0.com' };

    const oio = new OiO();
    const ctx = oio.newCtx();
    const resData = await ctx.setUrl(url).setMethod('post').setData(data).setParams(params).run();
    expect(resData.data).to.have.nested.property('queries.id', params.id + '');
    expect(resData.data).to.have.nested.property('queries.email', params.email);
    expect(resData.data).to.have.nested.property('body.user', data.user);
    expect(resData.data).to.have.nested.property('body.name', data.name);
    if (resData.data) {
      expect(resData.data.headers['content-type']).equal('application/json;charset=utf-8');
    }

    const resData2 = await ctx.setReq({ url, method: 'post', data, params }).run();
    expect(resData2.data).to.have.nested.property('queries.id', params.id + '');
    expect(resData2.data).to.have.nested.property('queries.email', params.email);
    expect(resData2.data).to.have.nested.property('body.user', data.user);
    expect(resData2.data).to.have.nested.property('body.name', data.name);

  }).timeout(timeout);

});
