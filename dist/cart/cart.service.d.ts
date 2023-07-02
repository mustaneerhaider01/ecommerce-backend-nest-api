import { Cart } from './schema/cart.schema';
import { Model } from 'mongoose';
export declare class CartService {
    private readonly cartModel;
    constructor(cartModel: Model<Cart>);
    addItemToCart(productId: string, userId: string): Promise<void>;
    decreaseItemQuantity(productId: string, userId: string): Promise<boolean | void>;
    getCart(userId: string): Promise<{
        id: string;
        product: {
            title: string;
            image: string;
            description: string;
            price: number;
        };
        quantity: number;
    }[]>;
    clearCart(userId: string): Promise<void>;
    private findCart;
}
