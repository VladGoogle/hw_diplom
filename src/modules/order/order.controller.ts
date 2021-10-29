import { Controller, Body, Post, UseGuards, Request,Req, Get, Param, Delete, Put, Patch } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { orderStatus } from './order.entity';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Post('users/:id/orders')
    async createOrder(@Body () order:OrderDto) {
        return await this.orderService.createOrder(order)
    }

    @Patch('users/:user_id/orders/:order_id/status')
    async changeOrderStatus(@Body () status:orderStatus, @Param('user_id') user_id:string, @Param('order_id') order_id:string) {
        const userId = parseInt(user_id)
        const orderId = parseInt(order_id)
        return await this.orderService.changeOrderStatus(status, userId, orderId)
    }

    @Get('orders')
    async getOrders() {
        return await this.orderService.getOrders()
    }

    @Get('orders/:id')
    async getOrderById(@Param('id') id:string) {
        const orderId = parseInt(id)
        return await this.orderService.getOrderById(orderId)
    }

    @Delete('orders/:id')
    async deleteOrder(@Param('id') id:string) {
        const orderId = parseInt(id)
        return await this.orderService.deleteOrder(orderId)
    }
}
