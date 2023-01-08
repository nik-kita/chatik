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
  },
} as const;
