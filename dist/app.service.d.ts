import { CartService } from './cart/cart.service';
import { ConfigService } from '@nestjs/config';
export declare class AppService {
    private readonly config;
    private readonly cartService;
    private stripeClient;
    constructor(config: ConfigService, cartService: CartService);
    getHello(): string;
    createCheckoutSession(userId: string): Promise<string>;
}
