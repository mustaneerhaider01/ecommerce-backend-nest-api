import { CartService } from './cart.service';
import { AddToCartDto } from './dto/cart.dto';
import { Request } from 'express';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    addToCart({ productId }: AddToCartDto, req: Request): Promise<{
        message: string;
    }>;
    getCart(req: Request): Promise<{
        cart: {
            items: {
                id: string;
                product: {
                    title: string;
                    image: string;
                    description: string;
                    price: number;
                };
                quantity: number;
            }[];
        };
    }>;
    decrementItemQuantity({ productId }: AddToCartDto, req: Request): Promise<{
        message: string;
    }>;
}
