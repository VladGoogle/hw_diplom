import { Controller, Body, Post, UseGuards, Request,Req, Get, Param, Delete, Put, Patch } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { orderStatus } from './order.entity';
import { OrderService } from './order.service';

@Controller('users')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Post('create/order')
    async createOrder(@Body () order:OrderDto) {
        return await this.orderService.createOrder(order)
    }

    @Patch('admin/change/order/status/:id')
    async changeOrderStatus(@Body () status:orderStatus, user_id:number, @Param('id') id, ) {
        return await this.orderService.changeOrderStatus(status, user_id, id)
    }

    @Get('get/orders')
    async getOrders() {
        return await this.orderService.getOrders()
    }

    @Get('get/order/by/:id')
    async getOrderById(@Param('id') id:string) {
        const orderId = parseInt(id)
        return await this.orderService.getOrderById(orderId)
    }

    @Delete('delete/order/:id')
    async deleteOrder(@Param('id') id) {
        return await this.orderService.deleteOrder(id)
    }
}
