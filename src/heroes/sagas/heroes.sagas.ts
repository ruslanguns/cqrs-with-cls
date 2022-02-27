import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { DropAncientItemCommand } from '../commands/impl/drop-ancient-item.command';
import { HeroKilledDragonEvent } from '../events/impl/hero-killed-dragon.event';
import { StoreAndLogService } from '../store-and-log.service';

const itemId = '0';

@Injectable()
export class HeroesGameSagas {
  constructor(private readonly logger: StoreAndLogService) {}

  @Saga()
  dragonKilled = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(HeroKilledDragonEvent),
      delay(1000),
      map((event) => {
        console.log(clc.redBright('Inside [HeroesGameSagas] Saga'));
        return new DropAncientItemCommand(event.heroId, itemId);
      }),
      tap(() => {
        const data = this.logger.getData('demoData');
        console.log(data);
        this.logger.log(`Inside [HeroesGameSagas] Saga`);
      }),
    );
  };
}
