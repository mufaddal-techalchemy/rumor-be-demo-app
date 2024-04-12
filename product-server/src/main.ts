// grpc.server.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as grpc from 'grpc';

async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.GRPC,
        options: {
            url: '0.0.0.0:50051',
            credentials: grpc.ServerCredentials.createInsecure(),
        }
    });
    app.listen();
}
bootstrap();
