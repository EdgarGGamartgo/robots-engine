import { Test, TestingModule } from '@nestjs/testing';
import { StoreMapService } from './store-map.service';

describe('StoreMapService', () => {
  let service: StoreMapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreMapService],
    }).compile();

    service = module.get<StoreMapService>(StoreMapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
