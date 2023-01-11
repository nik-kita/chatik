import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import * as req from 'supertest';
import { TEST_COMMON_FIXTURES } from '../../../../__test__/common-test-fixtures';
import { MemberPgRepo, RoomPgRepo } from '../../../../libs/pg-db/src';
import { IPgRoom } from '../../../../libs/types/src/pg';
import { JwtAccessAuthGuard } from '../../src/common/strategies/jwt-access/jwt-access-auth.guard';
import { RoomController } from '../../src/components/room/room.controller';

const { app: { POST }, mock } = TEST_COMMON_FIXTURES;
const createdRoomId = mock.uuid[ 0 ];
const myId = mock.uuid[ 1 ];
const flipsideUserId = mock.uuid[ 2 ];


describe('RoomController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const fixture = await Test.createTestingModule({
      controllers: [
        RoomController,
      ],
      providers: [
        {
          provide: ConfigService,
          useValue: mock.configService,
        },
        {
          provide: RoomPgRepo,
          useValue: {
            insert: jest
              .fn()
              .mockResolvedValue({ room_id: createdRoomId } satisfies Pick<IPgRoom, 'room_id'>),
          },
        },
        {
          provide: MemberPgRepo,
          useValue: {
            insertMany: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAccessAuthGuard)
      .useValue(mock.authGuard({ user_id: myId }))
      .compile();

    app = await fixture
      .createNestApplication()
      .useGlobalPipes(new ValidationPipe())
      .init();

    // app.useGlobalPipes(new ValidationPipe());
  });

  it.each([
    {},
    { hello: 'world' },
    { flipsideUserId: 'no-uuid' },
  ])('Should not allow req with invalid body', async (reqBody) => {
    const res = await req(app.getHttpServer())
      .post(POST[ '/room/one-to-one' ])
      .send(reqBody);

    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(res.status).toBeLessThan(500);
  });

  it.each([
    { flipsideUserId },
  ])('Should create room', async (reqBody) => {
    console.log(reqBody);
    const { body: bodyCreateRoom } = await req(app.getHttpServer())
      .post(POST[ '/room/one-to-one' ])
      .send(reqBody).expect(201);

    expect(bodyCreateRoom?.room_id).toBe(createdRoomId);
  });

  afterAll(async () => {
    await app.close();
  });
});
