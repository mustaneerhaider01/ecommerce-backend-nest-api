import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ProductsService } from './products.service';

@Injectable()
export class ProductGuard implements CanActivate {
  constructor(private readonly productsService: ProductsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const productId = request.params.id;
    const userId = request['user'].userId as string;

    const product = await this.productsService.fetchProduct(productId);

    if (product.creator.id !== userId) {
      throw new UnauthorizedException(
        'You are not allowed to update or delete the product',
      );
    }

    return true;
  }
}
