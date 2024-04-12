import { Injectable } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import * as grpc from 'grpc';

@Injectable()
export class RecipesService {
    private readonly RECIPES = [
        {
            id: 1,
            title: 'Pizza',
            quantity: 1,
        },
        {
            id: 2,
            title: 'Lasagna',
            quantity: 1,
        },
    ];

    @GrpcMethod('RecipesService', 'find')
    findProduct(productId: number, callback: grpc.sendUnaryData<any>): void {
        const recipe = this.RECIPES.find((recipe) => recipe.id == productId);
        if (recipe) {
            callback(null, recipe);
        } else {
            callback(null, {
                message: 'Recipe not found',
                code: grpc.status.INVALID_ARGUMENT,
            });
        }
    }
}
