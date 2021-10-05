import { Test, TestingModule } from '@nestjs/testing';
import { ModproductorderService } from './modproductorder.service';

describe('ModproductorderService', () => {
  let service: ModproductorderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModproductorderService],
    }).compile();

    service = module.get<ModproductorderService>(ModproductorderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
