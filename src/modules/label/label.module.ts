import { Module } from '@nestjs/common';
import { LabelService } from './label.service';;
import { TypeOrmModule } from '@nestjs/typeorm';
import { Label } from './label.entity';
import { LabelController } from './label.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Label])],
  providers: [LabelService],
  exports: [LabelService],
  controllers: [LabelController],
})
export class LabelModule {}
