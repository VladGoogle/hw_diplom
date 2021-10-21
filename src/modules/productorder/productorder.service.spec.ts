import { Test, TestingModule } from '@nestjs/testing';
import { ProductOrderService } from './productorder.service';

describe('ProductorderService', () => {
  let service: ProductOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductOrderService],
    }).compile();

    service = module.get<ProductOrderService>(ProductOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
