import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { GrpcMethod } from '@nestjs/microservices';
import {
    ProductRequest,
    ProductResponse,
} from '../interface/product.interface';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    @GrpcMethod('GrpcServices', 'productAvailability')
    async productAvailability(
        data: ProductRequest,
    ): Promise<ProductResponse> {
        const product = await this.findOne(data.productId);
        return { available: product.quantity >= 1 };
    }

    async create(productData: Partial<Product>): Promise<Product> {
        const product = this.productRepository.create(productData);
        return this.productRepository.save(product);
    }

    async findAll(ids?: string): Promise<Product[]> {
        let where = {}
        if (ids) {
            where = { id: In(ids.split(",")) }
        }
        return this.productRepository.find({ where });
    }

    async findOne(id): Promise<Product> {
        return this.productRepository.findOne({ where: { id } });
    }

    async update(id, productData: Partial<Product>): Promise<Product> {
        await this.productRepository.update({ id }, productData);
        return this.productRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.productRepository.delete(id);
    }
}
