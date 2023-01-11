import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';
import * as EventEmitter from 'events';
import { WebSocket } from 'ws';
import { TEST_COMMON_FIXTURES } from '../../../../__test__/common-test-fixtures';


const {
  ws,
} = TEST_COMMON_FIXTURES;

const [A] = Array.from({ length: 1 }).map(() => {
  const email = faker.internet.email();

  return {
    email,
    password: faker.internet.password(8, true, /[a-z][A-Z]\d\W.+/),
    access: '',
    refresh: '',
    user_id: '',
  };
});

describe('Check server restriction for unauthorized ws-connections', () => {
  const clients = new WeakMap<object, WebSocket>();
  const wsClientDebugger = new EventEmitter();

  it.each([
    {
      secondWsConstructorArg: undefined,
      should: 'Should at once disconnect without headers',
      errorMessage: '/Authorization/ header is missing',
    },
    {
      secondWsConstructorArg: {
        headers: {},
      },
      should: 'Should at once disconnect without /Authorization/ header',
      errorMessage: '/Authorization/ header is missing',
    },
    {
      secondWsConstructorArg: {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOTQwZTdmZDEtN2RjOS00YTAxLTlhMzItMzYwNDBlZWFkY2UxIiwiaWF0IjoxNjczMjE2Njg1LCJleHAiOjE2NzMyMTY3NDV9.VOqMlZ98BEDmxHLEzxfdzkE5dLqum3UjviOBNja5g00',
        },
      },
      should: 'Should at once disconnect with expired jwt',
      errorMessage: 'jwt expired',
    },
  ])('$should', async ({ secondWsConstructorArg, errorMessage }) => {
    let isClosed = false;
    let isOpened = false;

    await new Promise<void>((resolve) => {
      const off = setTimeout(() => { resolve(); }, 5_000);
      const client = new WebSocket(ws.wsHost, secondWsConstructorArg);

      client.on('message', (data: any) => {
        const _data = JSON.parse(data.toString());
        wsClientDebugger.emit(A.email, _data);
      }).on('open', () => {
        isOpened = true;
      }).on('error', (error) => {
        clearTimeout(off);
        expect('not').toBe('here');
        console.error(error);
        resolve();
      }).on('close', (code, reason) => {
        clearTimeout(off);
        isClosed = true;
        expect(code).toBe(HttpStatus.UNAUTHORIZED + 4000);
        const jData = JSON.parse(String(reason));
        expect(jData?.data?.message).toBe(errorMessage);
        resolve();
      });

      clients.set(A, client);
    });

    expect(isOpened).toBe(true);
    expect(isClosed).toBe(true);
  }, 10_000);

  afterAll(async () => {
    [A].forEach((u) => {
      const wsClient = clients.get(u);

      if (!wsClient) return;

      const { readyState, OPEN, CONNECTING } = wsClient;

      if (([OPEN, CONNECTING] as number[]).includes(readyState)) wsClient.close();
    });
  });
});
