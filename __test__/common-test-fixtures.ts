import { ExecutionContext } from '@nestjs/common';

const uuid = {
  0: 'c3c87919-bb51-4cc1-8e0a-a08f9c7606ff',
  1: '6fcab526-4f3f-42f9-9104-a2305d5b6c5f',
  3: '1ae14682-ab42-4aa5-944d-3e35cef6e00b',
  4: '6ca959a4-50a1-47b9-bcdc-47b555f66c4b',
  5: 'b930ad12-ada5-4bcd-a4f1-599aa7a0c234',
};

export const TEST_COMMON_FIXTURES = {
  ws: {
    httpHost: `http://localhost:${process.env.TEST_CHATIK_WS_PORT}`,
    wsHost: `ws://localhost:${process.env.TEST_CHATIK_WS_PORT}`,
  },
  auth: {
    host: `http://localhost:${process.env.TEST_CHATIK_AUTH_PORT}`,
    POST: {
      [ '/auth/register' ]: '/auth/register',
      [ '/auth/login' ]: '/auth/login',
      [ '/auth/refresh' ]: '/auth/refresh',
    },
  },
  app: {
    host: `http://localhost:${process.env.TEST_CHATIK_PORT}`,
    POST: {
      [ '/room/one-to-one' ]: '/room/one-to-one',
    },
    GET: {
      [ '/room/one-to-one' ]: '/room/one-to-one',
    },
  },
  mock: {
    uuid,
    authGuard: (payload: any = { user_id: uuid[ 0 ] }, validate = true) => ({
      canActivate: jest.fn((ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();

        req.user = payload;

        return validate;
      }),
    }),
    configService: {
      get: jest.fn(),
    },
  },
} as const;
