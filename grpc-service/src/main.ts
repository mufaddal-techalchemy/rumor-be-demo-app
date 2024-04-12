import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { grpcClientOptions } from './grpc-client.options';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);
    await app.startAllMicroservices();
    await app.listen(50051);
    console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
