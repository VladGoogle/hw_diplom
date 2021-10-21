import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { CardDto } from './dto/card.dto';

@Injectable()
export class CardService {
    constructor( 
        @InjectRepository(Card)
            private cardRepository: Repository<Card>,
          ) {}

          async createCard(card: CardDto): Promise<Card> {
            let cardEntity =  new Card()
                cardEntity.external_id = card.external_id,
                cardEntity.userId =card.userId
              const data = await this.cardRepository.save(cardEntity)
              return data;
            }
    
        async getCardById(id: number): Promise<Card | undefined> {
            const data =  await this.cardRepository.findOne({id});
            return data;
        }
    
        async getCardByUserId(userId: number): Promise<Card | undefined> {
            const data =  await this.cardRepository.findOne({userId}, {relations:['user']});
            return data;
        }
    
        async getCards(): Promise<Card[]> {
            const data =  await this.cardRepository.find({relations:['user']});
            return data;
        }
    
        async deleteCard(id:number): Promise<void> {
            await this.cardRepository.delete(id);
    }
}
