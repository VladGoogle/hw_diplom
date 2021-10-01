import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderDto } from './dto/order.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { databaseConfig } from 'src/core/database/database.config';


@Injectable()
export class OrderService {
    constructor( 
        @InjectRepository(Order)
            private userRepository: Repository<Order>,
            private userService:UsersService
          ) {}

          async createOrder(order: OrderDto): Promise<Order> {
                const data = this.userRepository.create({
                    description:order.description,
                    totalPrice:order.totalPrice,
                    tax:order.tax,
                    status:order.status,
                    user_id:order.user_id,
                    prod_id:order.prodOrder_id
                })
                return data;
          }

          async getOrders(): Promise<Order[]> {
            const result = await this.userRepository.find({relations:["user", "prod"]})
            return result;
        }

        async getOrderById(id:number): Promise<Order> {
            const result = await this.userRepository.findOne({id},{relations:["user", "prod"]})
            return result;
        }

        async changeOrderStatus(status: string, user_id: number, id: number): Promise<Order>
        {
            const user = await this.userService.getUserById(user_id)
            if(user.type ==='admin')
            {
                const order = await this.userRepository.findOne({id},{relations:["user", "prod"]})
                order.status = status;
                await this.userRepository.save(order)
                return order;
            }
            else {
                throw "You must be an admin to update order status"
            }
        }

}
