import { Product } from './schema/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
export declare class ProductsService {
    private readonly productModel;
    constructor(productModel: Model<Product>);
    insertProduct({ creatorId, ...productInput }: CreateProductDto): Promise<string>;
    fetchProducts(): Promise<{
        id: string;
        title: string;
        image: string;
        description: string;
        price: number;
        createdAt: Date;
        creator: {
            id: string;
        };
    }[]>;
    fetchProduct(productId: string): Promise<{
        id: string;
        title: string;
        image: string;
        description: string;
        price: number;
        createdAt: Date;
        creator: {
            id: string;
        };
    }>;
    updateProduct({ title, image, price, description }: UpdateProductDto, productId: string): Promise<void>;
    removeProduct(productId: string): Promise<void>;
    private findProduct;
    private transformProduct;
}
