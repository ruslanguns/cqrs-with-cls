import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { StoreAndLogService } from '../../store-and-log.service';
import { HeroFoundItemEvent } from '../impl/hero-found-item.event';

@EventsHandler(HeroFoundItemEvent)
export class HeroFoundItemHandler implements IEventHandler<HeroFoundItemEvent> {
  constructor(private readonly logger: StoreAndLogService) {}
  handle(event: HeroFoundItemEvent) {
    this.logger.log(`HeroFoundItemEvent`);
    console.log(clc.yellowBright('Async HeroFoundItemEvent...'));
  }
}
