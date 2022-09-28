import { Test, TestingModule } from '@nestjs/testing';
import { ComparitionService } from './comparition.service';

describe('ComparitionService', () => {
  let service: ComparitionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComparitionService],
    }).compile();

    service = module.get<ComparitionService>(ComparitionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
