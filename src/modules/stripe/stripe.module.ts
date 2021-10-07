import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import {TransactionService} from "../transaction/transaction.service";
import {CardService} from "../card/card.service";
import {UsersService} from "../users/users.service";
import {CardModule} from "../card/card.module";
import {TransactionModule} from "../transaction/transaction.module";
import {UsersModule} from "../users/users.module";

@Module({
  imports: [CardModule, TransactionModule, UsersModule],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}
