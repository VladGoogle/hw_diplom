import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, orderStatus } from './order.entity';
import { OrderDto } from './dto/order.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';



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
                    prodOrder_id:order.prodOrder_id
                })
                return data;
          }

          async getOrders(): Promise<Order[]> {
            const result = await this.userRepository.find({relations:["user", "prodorders"]})
            return result;
        }

        async getOrderById(id:number): Promise<Order> {
            const result = await this.userRepository.findOne({id},{relations:["user", "prodorders"]})
            return result;
        }

        async changeOrderStatus(status: orderStatus, user_id: number, id: number): Promise<Order>
        {
            const user = await this.userService.getUserById(user_id)
            if(user.type ==='admin')
            {
                const order = await this.userRepository.findOne({id},{relations:["user", "prodorders"]})
                order.status = status;
                await this.userRepository.save(order)
                return order;
            }
            else {
                throw "You must be an admin to update order status"
            }
        }

        async deleteOrder(id:number): Promise<void> {
            await this.userRepository.delete(id)
        }
}
