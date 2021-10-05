import { Module } from '@nestjs/common';
import { ModifiersService } from './modifier.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modifier } from './modifier.entity';
import { ModifierController } from './modifier.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Modifier])],
  providers: [ModifiersService],
    exports: [ModifiersService],
    controllers: [ModifierController],
})
export class ModifiersModule {}
