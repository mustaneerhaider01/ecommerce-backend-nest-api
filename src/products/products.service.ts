import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schema/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async insertProduct({ creatorId, ...productInput }: CreateProductDto) {
    const newProduct = new this.productModel({
      ...productInput,
      creator: creatorId,
    });
    const createdProduct = await newProduct.save();
    return createdProduct.id as string;
  }

  async fetchProducts() {
    const products = await this.productModel.find();
    return products.map((prod) => this.transformProduct(prod));
  }

  async fetchProduct(productId: string) {
    const product = await this.findProduct(productId);
    return this.transformProduct(product);
  }

  async updateProduct(
    { title, image, price, description }: UpdateProductDto,
    productId: string,
  ) {
    const updatedProduct = await this.productModel.findById(productId);

    if (title) {
      updatedProduct.title = title;
    }
    if (image) {
      updatedProduct.image = image;
    }
    if (price) {
      updatedProduct.price = price;
    }
    if (description) {
      updatedProduct.description = description;
    }

    await updatedProduct.save();
  }

  async removeProduct(productId: string) {
    await this.productModel.findByIdAndRemove(productId);
  }

  private async findProduct(id: string) {
    let product: ProductDocument | undefined;

    try {
      product = await this.productModel.findById(id).populate('creator');
    } catch {
      throw new BadRequestException("Couldn't find the product.");
    }

    if (!product) {
      throw new BadRequestException("Couldn't find the product.");
    }
    return product;
  }

  private transformProduct(product: ProductDocument) {
    return {
      id: product.id as string,
      title: product.title,
      image: product.image,
      description: product.description,
      price: product.price,
      createdAt: product.createdAt,
      creator: {
        id: product.creator?._id.toString(),
      },
    };
  }
}
