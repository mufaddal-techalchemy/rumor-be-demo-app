import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Product API')
        .setDescription('API for managing products')
        .setVersion('1.0')
        .addTag('products')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/product-service', app, document);

    await app.listen(process.env.PORT);
    console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
