import { Transport } from '@nestjs/microservices';
import * as path from 'path';

export const grpcClientOptions = {
    transport: Transport.GRPC,
    options: {
        package: 'product',
        protoPath: path.join(
            __dirname,
            '../../grpc-service/src/proto/product.proto',
        ),
    },
};
