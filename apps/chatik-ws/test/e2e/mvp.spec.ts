/* eslint-disable @typescript-eslint/no-unused-vars */
import * as req from 'supertest';
import { faker } from '@faker-js/faker';
import { WebSocket } from 'ws';
import * as EventEmitter from 'events';
import { MessageGateEvent } from '../../../../libs/types/src/ws'
import { LoginResDto, RegisterReqDto } from '../../../../libs/dto/src/http';

// TODO move to fixtures
const ws = {
  httpHost: `http://localhost:${process.env.TEST_CHATIK_WS_PORT}`,
  wsHost: `ws://localhost:${process.env.TEST_CHATIK_WS_PORT}`,
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

const [A, B] = Array.from({ length: 2 }).map(() => ({
  email: faker.internet.email(),
  password: faker.internet.password(8, true, /[a-z][A-Z]\d\W.+/),
  access: '',
  refresh: '',
  user_id: '',
  label: '',
}));
const userDataProvider = [A, B].map((user) => ({ email: user.email, label: user.email, user }));

describe('MVP', () => {
  const clients = new WeakMap<object, WebSocket>();
  const wsClientDebugger = new EventEmitter();

  it.each(userDataProvider)('Should register user with /$email/ email', async ({ user }) => {
    const registerDto: RegisterReqDto = {
      email: user.email,
      password: user.password,
    };
    const { body: bodyRegister } = await req(auth.host)
      .post(auth.POST['/auth/register'])
      .send(registerDto)
      .expect(201);

    expect(bodyRegister).toBeInstanceOf(Object);
  });

  it.each(userDataProvider)('Should login as /$email/ user', async ({ user }) => {
    const { body: bodyLogin } = await req(auth.host)
      .post(auth.POST['/auth/login'])
      .send(user)
      .expect(201);

    expect(bodyLogin).toBeInstanceOf(Object);

    const { jwt, user_id } = bodyLogin as LoginResDto;

    expect(jwt).toBeInstanceOf(Object);

    const { access, refresh } = jwt;

    expect(access).toMatch(/\S+/);
    expect(refresh).toMatch(/\S+/);
    expect(user_id).toMatch(/\S+/);


    user.access = access;
    user.refresh = refresh;
    user.user_id = user_id;
  });

  it.each(userDataProvider)('Should connect to ws as /$email/ user', async ({ user, label }) => {
    await new Promise<void>((resolve, reject) => {

      const client = new WebSocket(ws.wsHost, {
        headers: {
          Authorization: `Bearer ${user.access}`,
        },
      }).on('sendedMessageStatus', (data) => {
        wsClientDebugger.emit(label, data);
      }).on('open', () => {
        expect('should').not.toBe('problem');
        resolve();
      }).on('error', (error) => {
        expect('not').toBe('here');
        reject(error);
      });

      clients.set(user, client);
    });
  });

  /**
   * // TODO!!!
   * During message sending you should add "to" property with
   * receiver's "user_id".
   * Rebuild "/auth/login" (add "user_id" in response)
   * and use it to repair this test.
   */
  it(`User /${A.email}/ should send message to user /${B.email}/`, async () => {
    const client = clients.get(A);

    expect(client).toBeInstanceOf(WebSocket);

    if (!client) return;

    await new Promise<void>((resolve, reject) => {
      const off = setTimeout(() => {
        resolve();
        expect('not').toBe('here');
      }, 2_000);

      wsClientDebugger.on(A.label, (data) => {
        clearTimeout(off);
        resolve();
        expect(data).toBeDefined();
      });

      client.send(JSON.stringify({
        event: MessageGateEvent.SEND_MESSAGE,
        data: {
          text: `\
Hi! ${faker.name.firstName()}! How are You? \
I know cool song - "${faker.music.songName()}"!\
`,
        },
      }));
    });
  }, 10_000);

  afterAll(async () => {
    [A, B].forEach((u) => {
      const wsClient = clients.get(u);

      if (!wsClient) return;

      const { readyState, OPEN, CONNECTING } = wsClient;

      if (([OPEN, CONNECTING] as number[]).includes(readyState)) wsClient.close();
    });
  });
});
