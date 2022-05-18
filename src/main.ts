import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const documentBuilder = new DocumentBuilder()
      .setTitle('Bonun Coaching App API')
      .setDescription('Bonun Coaching App API documentation.')
      .setVersion('1.0')
      .addTag('bonun-coaching')
      .build();
  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('swagger', app, document);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    console.log(`The application is running on localhost:${PORT}!`);
  });
}
bootstrap();
