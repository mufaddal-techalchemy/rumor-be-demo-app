
import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import {
  ClientGrpc,
  GrpcMethod,
  GrpcStreamMethod,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { ProductById } from '../interface/product-by-id.interface';
import { Product } from '../interface/product.interface';


interface ProductService {
  findOne(data: ProductById): Observable<Product>;
  findMany(upstream: Observable<ProductById>): Observable<Product>;
}

@Controller('product')
export class ProductController implements OnModuleInit {
  private readonly items: Product[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
  ];
  private productService: ProductService;

  constructor(@Inject('PRODUCT_PACKAGE') private readonly client: ClientGrpc) { }

  onModuleInit() {
    this.productService = this.client.getService<ProductService>('ProductService');
  }


  @Get(':id')
  getById(@Param('id') id: string): Observable<Product> {
    return this.productService.findOne({ id: +id });
  }

  @GrpcMethod('ProductService')
  findOne(data: ProductById): Product {
    return this.items.find(({ id }) => id === data.id);
  }
}
