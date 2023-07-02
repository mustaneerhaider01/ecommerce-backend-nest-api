import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    addProduct(createProductInput: CreateProductDto): Promise<{
        message: string;
        prodId: string;
    }>;
    getProducts(): Promise<{
        products: {
            id: string;
            title: string;
            image: string;
            description: string;
            price: number;
            createdAt: Date;
            creator: {
                id: string;
            };
        }[];
    }>;
    getProduct(prodId: string): Promise<{
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
    updateProduct(updateProductInput: UpdateProductDto, prodId: string): Promise<{
        message: string;
    }>;
    deleteProduct(prodId: string): Promise<{
        message: string;
    }>;
}
