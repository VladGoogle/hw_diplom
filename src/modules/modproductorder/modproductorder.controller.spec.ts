import { Test, TestingModule } from '@nestjs/testing';
import { ModproductorderController } from './modproductorder.controller';

describe('ModproductorderController', () => {
  let controller: ModproductorderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModproductorderController],
    }).compile();

    controller = module.get<ModproductorderController>(ModproductorderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
