import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PublicWebsiteModule } from './public-website/public.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('PMS API')
    .setDescription('Property Management System API documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const dashboardConfig = new DocumentBuilder()
    .setTitle('DPH - Public Website API')
    .setDescription('All the endpoints used in public website are listed here')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();

  const dashboardDocument = SwaggerModule.createDocument(app, dashboardConfig, {
    include: [PublicWebsiteModule],
    deepScanRoutes: true,
  });

  SwaggerModule.setup('/api/docs/website', app, dashboardDocument);

  await app.listen(3000);
  console.log('App is running at: ', await app.getUrl());
}

void bootstrap();
