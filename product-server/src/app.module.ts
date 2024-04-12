// app.module.ts

import { Module } from '@nestjs/common';
import { ProductGrpcModule } from './product-grpc/product-grpc.module';
import { RecipesService } from './product-grpc/product.service';

@Module({
    imports: [ProductGrpcModule],
    providers: [RecipesService],
})

export class AppModule { }
