import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService= app.get(ConfigService)

  // console.log( configService.get('PORT'))
  // const configService = app.get(ConfigService)
  // console.log(configService.get('JWT_SECRET'));
  
  app.useGlobalPipes(new ValidationPipe(
    {
    whitelist: true,
    transform:true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }))
  //app.useGlobalFilters()
  
  await app.listen((configService.get('PORT')) || 3001);
}
bootstrap();
