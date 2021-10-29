import { Controller, Body, Post, UseGuards, Request,Req, Get, Param, Delete, Put } from '@nestjs/common';
import { CardService } from './card.service';
import { CardDto } from './dto/card.dto';

@Controller()
export class CardController {
    constructor(private cardService: CardService) {}

    @Post('users/:id/cards')
    async createCard(@Body () card:CardDto) {
        return await this.cardService.createCard(card)
    }

    @Get('cards')
    async getCards() {
        return await this.cardService.getCards()
    }

    @Get('cards/:id')
    async getCardById(@Param('id') id:string) {
        const cardId = parseInt(id)
        return await this.cardService.getCardById(cardId)
    }

    @Get('cards/:user_id')
    async getCardByUserId(@Body('user_id') user_id:string) {
        const userId = parseInt(user_id)
        return await this.cardService.getCardByUserId(userId)
    }

    @Delete('cards/:id')
    async deleteCard(@Param('id') id:string) {
        const cardId = parseInt(id)
        return await this.cardService.deleteCard(cardId)
    }
}
