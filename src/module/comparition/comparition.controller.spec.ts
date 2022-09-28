import { Test, TestingModule } from '@nestjs/testing';
import { ComparitionController } from './comparition.controller';

describe('ComparitionController', () => {
  let controller: ComparitionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComparitionController],
    }).compile();

    controller = module.get<ComparitionController>(ComparitionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
