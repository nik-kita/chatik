import { Test, TestingModule } from '@nestjs/testing';
import { ReqDtosService } from './req-dtos.service';

describe('ReqDtosService', () => {
  let service: ReqDtosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReqDtosService],
    }).compile();

    service = module.get<ReqDtosService>(ReqDtosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
