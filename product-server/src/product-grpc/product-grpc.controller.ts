import { Controller } from '@nestjs/common';
import { ProductGrpcService } from './product-grpc.service';

@Controller('product-grpc')
export class ProductGrpcController {
  constructor(private readonly productGrpcService: ProductGrpcService) {}
}
