import { Module } from '@nestjs/common';
import { ModifiersService } from './modifier.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modifier } from './modifier.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Modifier])],
  providers: [ModifiersService],
    exports: [ModifiersService],
})
export class ModifiersModule {}
