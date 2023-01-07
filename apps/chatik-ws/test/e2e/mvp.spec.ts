/* eslint-disable @typescript-eslint/no-unused-vars */
import * as req from 'supertest';
import { faker } from '@faker-js/faker';
import { WebSocket } from 'ws';
import * as EventEmitter from 'events';
import { MessageGateEvent } from '../../../../libs/types/src/ws'

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

const A = {
  email: faker.internet.email(),
  password: faker.internet.password(8, true, /[a-z][A-Z]\d\W.+/),
  access: '',
  refresh: '',
};
const label = {
  message: 'message',
}

describe('MVP', () => {
  const clients = new WeakMap<object, WebSocket>();
  const wsClientDebugger = new EventEmitter();

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

  it('Should connect to ws', async () => {
    await new Promise<void>((resolve, reject) => {

      const client = new WebSocket(ws.wsHost, {
        headers: {
          Authorization: `Bearer ${A.access}`,
        },
      }).on('message', (data) => {
        wsClientDebugger.emit(label.message, data);
      }).on('open', () => {
        expect('should').not.toBe('problem');
        resolve();
      }).on('error', (error) => {
        expect('not').toBe('here');
        reject(error);
      });

      clients.set(A, client);
    });
  });

  it('Should send message', async () => {
    const client = clients.get(A);

    expect(client).toBeInstanceOf(WebSocket);

    if (!client) return;

    await new Promise<void>((resolve, reject) => {
      const off = setTimeout(() => {
        expect('not').toBe('here');
        reject();
      }, 2_000);

      wsClientDebugger.on(label.message, (data) => {
        clearTimeout(off);
        expect(data).toBeDefined();
        resolve();
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
  });

  afterAll(async () => {
    [A].forEach((u) => {
      const wsClient = clients.get(u);

      if (!wsClient) return;

      const { readyState, OPEN, CONNECTING } = wsClient;

      if (([OPEN, CONNECTING] as number[]).includes(readyState)) wsClient.close();
    });
  });
});
