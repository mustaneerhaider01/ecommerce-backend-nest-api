import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import { CartService } from './cart/cart.service';

@Injectable()
export class AppService {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    private readonly cartService: CartService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createCheckoutSession(userId: string) {
    const cartItems = await this.cartService.getCart(userId);

    const transformCartItems = cartItems.map((item) => ({
      description: item.product.description,
      quantity: item.quantity,
      price_data: {
        unit_amount: Math.ceil(item.product.price * 100),
        currency: 'usd',
        product_data: {
          name: item.product.title,
          images: [item.product.image],
        },
      },
    }));

    const session = await this.stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: transformCartItems,
      mode: 'payment',
      success_url: 'http://localhost:8000/',
      cancel_url: 'http://localhost:8000/',
      metadata: {
        userId,
      },
    });

    return session.id;
  }
}
