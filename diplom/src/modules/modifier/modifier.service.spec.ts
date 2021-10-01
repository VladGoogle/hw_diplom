import { Test, TestingModule } from '@nestjs/testing';
import { ModifiersService } from './modifier.service';

describe('ModifierService', () => {
  let service: ModifiersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModifiersService],
    }).compile();

    service = module.get<ModifiersService>(ModifiersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
