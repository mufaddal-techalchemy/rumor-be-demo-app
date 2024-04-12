import { Controller, Post, Get, Body, HttpStatus } from '@nestjs/common';
import { OrderService } from './orders.service';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { Order } from './entities/order.entity';
import { CreateOrderDto, CreateOrderDtoArray } from './dto/create-order.dto';

@ApiBearerAuth()
@ApiTags('Orders')
@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post()
    @Post()
    @ApiOperation({ summary: 'Create Product' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'The order has been successfully placed.',
    })
    @ApiBody({ type: [CreateOrderDto] })
    async placeOrder(@Body() orderData: CreateOrderDtoArray) {
        try {
            const order = await this.orderService.placeOrder(orderData);
            return { status: HttpStatus.CREATED, success: true, data: order };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    @Get()
    @ApiOperation({ summary: 'List of all orders' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'List of orders',
        type: Order,
    })
    async listOrders() {
        try {
            const orders = await this.orderService.listOrders();
            return { status: HttpStatus.OK, success: true, data: orders };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}
