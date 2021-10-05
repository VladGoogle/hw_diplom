import { Module } from '@nestjs/common';
import { ModtoprodService } from './modtoprod.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModToProd } from './modtoprod.entity';
import { ModtoprodController } from './modtoprod.controller';

@Module({
  imports:[TypeOrmModule.forFeature([ModToProd])],
  providers: [ModtoprodService],
  exports:[ModtoprodService],
  controllers: [ModtoprodController]
})
export class ModtoprodModule {}
