import { join } from 'path';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as protoLoader from '@grpc/proto-loader';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { Order } from './entities/order.entity';
import { OrderDetails } from './entities/orderDetails.entity';
import { AxiosClient } from 'src/axios/axiosClient';

@Injectable()
export class OrderService extends AxiosClient {
    private productProto: any;
    private readonly productStub: any;
    private readonly packageDefinition: any;
    private axiosClient: AxiosClient;
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderDetails)
        private readonly orderDetailsRepository: Repository<OrderDetails>,
    ) {
        super()
        this.axiosClient = new AxiosClient();
        // this.packageDefinition = protoLoader.loadSync(join(__dirname, '../../../grpc-service/dist/product/product.proto'));
        // this.productProto = grpc.loadPackageDefinition(this.packageDefinition);
        // this.productStub = new this.productProto.Products('0.0.0.0:50051', grpc.credentials.createInsecure());
    }

    // @Client({
    //     transport: Transport.GRPC,
    //     options: {
    //         package: 'product',
    //         protoPath: path.join(
    //             __dirname,
    //             '../../../grpc-service/src/proto/product.proto',
    //         ),
    //     },
    // })
    // private readonly client: ClientGrpc;

    // private grpcService;

    // onModuleInit() {
    //     this.grpcService = this.client.getService('GrpcServices');
    // }

    async processOrder(productId: number) {
        return new Promise((resolve, reject) => {
            this.productStub.findOne({ id: productId }, (err, recipe) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(recipe);
                }
            });
        });
    }

    async placeOrder(orderData): Promise<Order> {
        console.log('orderData', orderData);

        const order = new Order();
        const savedOrder = await this.orderRepository.save(order);

        const productAvailabilityPromises = orderData.map(
            async ({ productId }) => {
                const product = await this.getCall(`/products/${productId}`);
                if (!product.success || product.data.quantity === 0) {
                    await this.orderRepository.delete(savedOrder.id);
                    throw new Error('Product not available or insufficient quantity');
                }
            },
        );

        await Promise.all(productAvailabilityPromises);

        const orderDetailsEntities = orderData.map(
            ({ productId, quantity }) => {
                const orderDetails = new OrderDetails();
                orderDetails.order = savedOrder;
                orderDetails.productId = productId;
                orderDetails.quantity = quantity;
                return orderDetails;
            },
        );

        return await this.orderDetailsRepository.save(orderDetailsEntities);
    }

    async listOrders(): Promise<Order[]> {
        const orders = await this.orderRepository.find({
            relations: ['orderDetails'],
            select: {
                id: true,
                createdAt: true,
                orderDetails: {
                    productId: true,
                    quantity: true,
                },
            },
        });
        const productIds: number[] = orders.flatMap(order =>
            order.orderDetails.map(orderDetail => orderDetail.productId)
        );
        const products = await this.getCall(`/products?ids=${productIds.join(",")}`);

        const productLookup = {};
        products.data.forEach(product => {
            productLookup[product.id] = product;
        });

        // Iterate through orders and details
        orders.forEach(order => {
            order.orderDetails.forEach(detail => {
                const product = productLookup[detail.productId];
                if (product) {
                    detail["productName"] = product.name;
                }
            });
        });
        return orders
    }
}
