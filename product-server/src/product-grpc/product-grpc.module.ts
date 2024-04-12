import { Module } from '@nestjs/common';
import { ProductGrpcService } from './product-grpc.service';
import { ProductGrpcController } from './product-grpc.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'RECIPES_PACKAGE',
                transport: Transport.GRPC,
                options: {
                    package: 'product',
                    protoPath: join(__dirname, '../../../product-grpc-server/src/protos/product.proto'),
                },
            },
        ]),
    ],
    controllers: [ProductGrpcController],
    providers: [ProductGrpcService],
})

export class ProductGrpcModule { }
