import { Controller, Body, Post, UseGuards, Request,Req, Get, Param, Delete, Put } from '@nestjs/common';
import { CardService } from './card.service';
import { CardDto } from './dto/card.dto';

@Controller('users')
export class CardController {
    constructor(private cardService: CardService) {}

    @Post('add/card')
    async createCard(@Body () card:CardDto) {
        return await this.cardService.createCard(card)
    }

    @Get('get/card/list')
    async getCards() {
        return await this.cardService.getCards()
    }

    @Get('get/card/by/:id')
    async getCardById(@Param('id') id) {
        return await this.cardService.getCardById(id)
    }

    @Get('get/card/by/user_id')
    async getCardByUserId(@Body() user_id:number) {
        return await this.cardService.getCardByUserId(user_id)
    }

    @Delete('delete/card/:id')
    async deleteCard(@Param('id') id) {
        return await this.cardService.deleteCard(id)
    }
}
