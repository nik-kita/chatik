import * as req from 'supertest';
import { faker } from '@faker-js/faker';

// TODO move to fixtures
const ws = {
  httpHost: `http://localhost:${process.env.TEST_CHATIK_WS_PORT}`,
  wsHost: '',
};
const auth = {
  host: `http://localhost:${process.env.TEST_CHATIK_AUTH_PORT}`,
  POST: {
    ['/auth/register']: '/auth/register',
    ['/auth/login']: '/auth/login',
    ['/auth/refresh']: '/auth/refresh',
  },
}
const app = {
  host: `http://localhost:${process.env.TEST_CHATIK_PORT}`,
};

const A = {
  email: faker.internet.email(),
  password: faker.internet.password(8, true, /[a-z][A-Z]\d\W.+/),
  access: '',
  refresh: '',
};

describe('MVP', () => {
  it('Should register new user', async () => {
    const { body: bodyRegister } = await req(auth.host)
      .post(auth.POST['/auth/register'])
      .send(A)
      .expect(201);

    expect(bodyRegister).toBeInstanceOf(Object);

    const { body: bodyLogin } = await req(auth.host)
      .post(auth.POST['/auth/login'])
      .send(A)
      .expect(201);
    
    expect(bodyLogin).toBeInstanceOf(Object);

    const { access, refresh } = bodyLogin;
    
    expect(access).toMatch(/\S+/);
    expect(refresh).toMatch(/\S+/);

    A.access = access;
    A.refresh = refresh;
  });
});
