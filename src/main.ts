import { NestFactory } from '@nestjs/core';
import { ClsMiddleware } from 'nestjs-cls';
import { ApplicationModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.use(
    new ClsMiddleware({
      /* useEnterWith: true */
    }).use,
  );
  app.listen(3000, () => console.log('Application is listening on port 3000.'));
}
bootstrap();
