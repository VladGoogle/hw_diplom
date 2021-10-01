import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { CardDto } from './dto/card.dto';

@Injectable()
export class CardService {
    constructor( 
        @InjectRepository(Card)
            private userRepository: Repository<Card>,
          ) {}

          async createCard(card: CardDto, id:number): Promise<Card> {
            const data = await this.userRepository.create({
                external_id:card.external_id,
                user_id:card.user_id
            })
        return data;
        }
    
        async getCardById(id: number): Promise<Card | undefined> {
            const data =  await this.userRepository.findOne({ where: { id:id } });
            return data;
        }
    
        async getCardByUserId(user_id: number): Promise<Card | undefined> {
            const data =  await this.userRepository.findOne({user_id}, {relations:["user"]});
            return data;
        }
    
        async getCards(): Promise<Card[]> {
            const data =  await this.userRepository.find({relations:["user"]});
            return data;
        }
    
        async deleteCard(id:number): Promise<void> {
            await this.userRepository.delete(id);
    }


}
