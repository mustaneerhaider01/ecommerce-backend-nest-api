import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ProductsService } from './products.service';
export declare class ProductGuard implements CanActivate {
    private readonly productsService;
    constructor(productsService: ProductsService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
