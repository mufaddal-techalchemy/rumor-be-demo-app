import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

/**
 * Data transfer object (DTO) for updating an existing product.
 * Inherits properties from CreateProductDto but makes them optional.
 */
export class UpdateProductDto extends PartialType(CreateProductDto) { }
