import { Test, TestingModule } from '@nestjs/testing';
import { ProductGrpcService } from './product-grpc.service';

describe('ProductGrpcService', () => {
  let service: ProductGrpcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductGrpcService],
    }).compile();

    service = module.get<ProductGrpcService>(ProductGrpcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
