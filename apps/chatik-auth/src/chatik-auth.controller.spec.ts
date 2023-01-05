import { Test, TestingModule } from '@nestjs/testing';
import { ChatikAuthController } from './chatik-auth.controller';
import { ChatikAuthService } from './chatik-auth.service';

describe('ChatikAuthController', () => {
  let chatikAuthController: ChatikAuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ChatikAuthController],
      providers: [ChatikAuthService],
    }).compile();

    chatikAuthController = app.get<ChatikAuthController>(ChatikAuthController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(chatikAuthController.getHello()).toBe('Hello World!');
    });
  });
});
