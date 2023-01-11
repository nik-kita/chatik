import { INestApplication } from '@nestjs/common';
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
