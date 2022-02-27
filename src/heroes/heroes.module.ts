import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClsMiddleware, ClsModule } from 'nestjs-cls';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { HeroesGameController } from './heroes.controller';
import { QueryHandlers } from './queries/handlers';
import { HeroRepository } from './repository/hero.repository';
import { HeroesGameSagas } from './sagas/heroes.sagas';
import { v4 as uuid } from 'uuid';
import { StoreAndLogService } from './store-and-log.service';

@Module({
  imports: [
    CqrsModule,
    ClsModule.register({
      middleware: {
        generateId: true,
        idGenerator: (req: Request) => uuid(),
      },
    }),
  ],
  controllers: [HeroesGameController],
  providers: [
    HeroRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    HeroesGameSagas,
    StoreAndLogService,
  ],
})
export class HeroesGameModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClsMiddleware).forRoutes(HeroesGameController);
  }
}
