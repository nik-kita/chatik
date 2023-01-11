/* eslint-disable @typescript-eslint/no-unused-vars */
import { faker } from '@faker-js/faker';
import * as EventEmitter from 'events';
import * as req from 'supertest';
import { WebSocket } from 'ws';
import { TEST_COMMON_FIXTURES } from '../../../../__test__/common-test-fixtures';
import { LoginResDto, RegisterReqDto } from '../../../../libs/dto/src/http';
import { SendMessageGateDto } from '../../../../libs/dto/src/ws';
import { GateMessage, MessageGateEvent } from '../../../../libs/types/src/ws';

const {
  auth,
  ws,
} = TEST_COMMON_FIXTURES;

const [A, B] = Array.from({ length: 2 }).map(() => {
  const email = faker.internet.email();

return {
    email,
    password: faker.internet.password(8, true, /[a-z][A-Z]\d\W.+/),
    access: '',
    refresh: '',
    user_id: '',
  };
});
const userDataProvider = [A, B].map((user) => ({ email: user.email, user }));

describe('MVP', () => {
  const clients = new WeakMap<object, WebSocket>();
  const wsClientDebugger = new EventEmitter();

  it.each(userDataProvider)('Should register user with /$email/ email', async ({ user }) => {
    const registerDto: RegisterReqDto = {
      email: user.email,
      password: user.password,
    };
    const { body: bodyRegister } = await req(auth.host)
      .post(auth.POST[ '/auth/register' ])
      .send(registerDto)
      .expect(201);

    expect(bodyRegister).toBeInstanceOf(Object);
  });

  it.each(userDataProvider)('Should login as /$email/ user', async ({ user }) => {
    const { body: bodyLogin } = await req(auth.host)
      .post(auth.POST[ '/auth/login' ])
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

  it.each(userDataProvider)('Should connect to ws as /$email/ user', async ({ user }) => {
    await new Promise<void>((resolve, reject) => {
      const client = new WebSocket(ws.wsHost, {
        headers: {
          Authorization: `Bearer ${user.access}`,
        },
      });
      client.on('message', (data: any) => {
        const _data = JSON.parse(data.toString());
        wsClientDebugger.emit(user.email, _data);
      }).on('open', () => {
        resolve();
      }).on('error', (error) => {
        expect('not').toBe('here');
        reject(error);
      });

      clients.set(user, client);
    });
  });


  it(`User /${A.email}/ should send message to user /${B.email}/`, async () => {
    const client = clients.get(A);

    expect(client).toBeInstanceOf(WebSocket);

    if (!client) return;

    await new Promise<void>(async (resolve) => {
      const off = setTimeout(() => {
        resolve();
        expect('not').toBe('here');
      }, 7_000);

      wsClientDebugger.on(A.email, (data: any) => {
        clearTimeout(off);
        resolve();
        expect(data).toBeDefined();
      });

      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 2_000);
      });

      const data: GateMessage<SendMessageGateDto> = {
        event: MessageGateEvent.SEND_MESSAGE,
        data: {
          to: B.user_id,
          text: `\
Hi! ${faker.name.firstName()}! How are You? \
I know cool song - "${faker.music.songName()}"!\
`,
        },
      };

      client.send(JSON.stringify(data));
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
