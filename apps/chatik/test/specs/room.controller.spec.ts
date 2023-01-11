import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as req from 'supertest';
import { MemberPgRepo, RoomPgRepo } from '../../../../libs/pg-db/src';
import { IPgRoom } from '../../../../libs/types/src/pg';
import { JwtAccessAuthGuard } from '../../src/common/strategies/jwt-access/jwt-access-auth.guard';
import { RoomController } from '../../src/components/room/room.controller';
import { TEST_COMMON_FIXTURES } from '../../../../__test__/common-test-fixtures';

const { app: { POST }, mock } = TEST_COMMON_FIXTURES;
const createdRoomId = mock.uuid[ 0 ];
const myId = mock.uuid[ 1 ];
const flipsideUserId = mock.uuid[ 2 ];

describe('RoomController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const fixture = await Test.createTestingModule({
      controllers: [RoomController],
      providers: [{
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
      }],
    }).overrideGuard(JwtAccessAuthGuard).useValue({
      validate: jest.fn().mockResolvedValue({ user_id: myId }),
    }).compile();

    app = await fixture.createNestApplication().init();
  });

  it('Should create room', async () => {
    const { body: bodyCreateRoom } = await req(app.getHttpServer())
      .post(POST[ '/room/one-to-one' ])
      .send({
        flipsideUserId,
      }).expect(201);

    expect(bodyCreateRoom).toBeInstanceOf(Object);
    expect(bodyCreateRoom.room_id).toBe(createdRoomId);
  });

  afterAll(async () => {
    await app.close();
  });
});
