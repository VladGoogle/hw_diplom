import { Module } from '@nestjs/common';
import { ModtoprodService } from './modtoprod.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModToProd } from './modtoprod.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ModToProd])],
  providers: [ModtoprodService],
  exports:[ModtoprodService]
})
export class ModtoprodModule {}
