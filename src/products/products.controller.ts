import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProductGuard } from './product.guard';

@UseGuards(AuthGuard)
@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(@Body() createProductInput: CreateProductDto) {
    const newProdId = await this.productsService.insertProduct(
      createProductInput,
    );
    return { message: 'Product added', prodId: newProdId };
  }

  @Get()
  async getProducts() {
    const products = await this.productsService.fetchProducts();
    return { products };
  }

  @Get(':id')
  async getProduct(@Param('id') prodId: string) {
    const product = await this.productsService.fetchProduct(prodId);
    return product;
  }

  @UseGuards(ProductGuard)
  @Patch(':id')
  async updateProduct(
    @Body() updateProductInput: UpdateProductDto,
    @Param('id') prodId: string,
  ) {
    await this.productsService.updateProduct(updateProductInput, prodId);
    return { message: 'Product updated' };
  }

  @UseGuards(ProductGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') prodId: string) {
    await this.productsService.removeProduct(prodId);
    return { message: 'Product deleted' };
  }
}
