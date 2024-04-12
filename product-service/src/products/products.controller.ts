import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpStatus,
    Query,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@ApiBearerAuth()
@ApiTags('Products')
@Controller('products')
export class ProductController {
    constructor(private readonly productsService: ProductService) { }

    @Post()
    @ApiOperation({ summary: 'Create Product' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'The product has been successfully created.',
    })
    @ApiBody({ type: CreateProductDto })
    async create(@Body() createProductDto: CreateProductDto) {
        try {
            const product = await this.productsService.create(createProductDto);
            return { status: HttpStatus.CREATED, success: true, data: product };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    @Get()
    @ApiOperation({ summary: 'List of all products' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'List of products',
        type: Product,
    })
    @ApiQuery({ name: 'ids', type: String, required: false })
    async findAll(@Query('ids') ids?: string) {
        try {
            const products = await this.productsService.findAll(ids);
            return { status: HttpStatus.OK, success: true, data: products };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Product details' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Product details',
        type: Product,
    })
    @ApiParam({ name: 'id', type: String })
    async findOne(@Param('id') id: string) {
        try {
            const product = await this.productsService.findOne(+id);
            if (product) {
                return { status: HttpStatus.OK, success: true, data: product };
            } else {
                return { success: false, message: 'No data found' };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update product' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The product has been successfully updated.',
    })
    @ApiBody({ type: UpdateProductDto })
    @ApiParam({ name: 'id', type: String })
    async update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        try {
            const product = await this.productsService.update(
                +id,
                updateProductDto,
            );
            return { status: HttpStatus.OK, success: true, data: product };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete product' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The product has been successfully deleted.',
    })
    @ApiParam({ name: 'id', type: String })
    async delete(@Param('id') id: string) {
        try {
            const data = this.productsService.delete(+id);
            return { status: HttpStatus.OK, success: true, data };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}
