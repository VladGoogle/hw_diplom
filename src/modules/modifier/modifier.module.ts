import { Module } from '@nestjs/common';
import { ModifiersService } from './modifier.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modifier } from './modifier.entity';
import { ModifierController } from './modifier.controller';
import {UsersModule} from "../users/users.module";

@Module({
  imports:[TypeOrmModule.forFeature([Modifier]), UsersModule],
  providers: [ModifiersService],
  controllers: [ModifierController],
  exports: [ModifiersService],
})
export class ModifiersModule {}
