import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { CardController } from './card.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Card])],
  providers: [CardService],
  exports:[CardService],
  controllers: [CardController]
})
export class CardModule {}
