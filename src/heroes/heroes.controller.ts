import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { KillDragonCommand } from './commands/impl/kill-dragon.command';
import { KillDragonDto } from './interfaces/kill-dragon-dto.interface';
import { Hero } from './models/hero.model';
import { GetHeroesQuery } from './queries/impl';
import { StoreAndLogService } from './store-and-log.service';

@Controller('hero')
export class HeroesGameController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly logger: StoreAndLogService,
  ) {}

  @Post(':id/kill')
  async killDragon(@Param('id') id: string, @Body() dto: KillDragonDto) {
    this.logger.log(`Hero ${id} is killing dragon`);
    return this.commandBus.execute(new KillDragonCommand(id, dto.dragonId));
  }

  @Get()
  async findAll(): Promise<Hero[]> {
    this.logger.log(`Hero is getting all heroes`);
    return this.queryBus.execute(new GetHeroesQuery());
  }
}
