import { Test, TestingModule } from '@nestjs/testing';
import { ChatikWsController } from './chatik-ws.controller';
import { ChatikWsService } from './chatik-ws.service';

describe('ChatikWsController', () => {
  let chatikWsController: ChatikWsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ChatikWsController],
      providers: [ChatikWsService],
    }).compile();

    chatikWsController = app.get<ChatikWsController>(ChatikWsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(chatikWsController.getHello()).toBe('Hello World!');
    });
  });
});
