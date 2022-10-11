import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);

}
bootstrap();
