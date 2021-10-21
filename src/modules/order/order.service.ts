import {ForbiddenException, Injectable} from '@nestjs/common';
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
            private orderRepository: Repository<Order>,
            private userService:UsersService
          ) {}

          async createOrder(order: OrderDto): Promise<Order> {
                let orderEntity = new Order()
                    orderEntity.description = order.description,
                    orderEntity.totalPrice =order.totalPrice,
                    orderEntity.tax =order.tax,
                    orderEntity.status =order.status,
                        orderEntity.userId =order.userId,
                        orderEntity.isMods =order.isMods
              if(order.isMods)
              {
                  orderEntity.modtoproducttoorderId = order.modtoproducttoorderId
              }
              else {
                  orderEntity.productorderId = order.productorderId
              }
              const data =await this.orderRepository.save(orderEntity)
              return data;
    }


          async getOrders(): Promise<Order[]> {
            const result = await this.orderRepository.find({relations:["user", "prodorders", "modprodorders"]})
            return result;
        }

        async getOrderById(id:number): Promise<Order> {
            const result = await this.orderRepository.findOne({where:{id:id}, relations:["user", "prodorders", "modprodorders"]})
            return result;
        }

        async changeOrderStatus(status: orderStatus, user_id: number, id: number): Promise<Order>
        {
            const user = await this.userService.getUserById(user_id)
            if(user.type ==='admin')
            {
                const order = await this.orderRepository.findOne(id)
                order.status = status;
                await this.orderRepository.save(order)
                return order;
            }
            else {
                throw new ForbiddenException("You must be an admin to update order status")
            }
        }

        async deleteOrder(id:number): Promise<void> {
            await this.orderRepository.delete(id)
        }
}
