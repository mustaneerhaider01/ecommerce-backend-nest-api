import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CartService } from './cart/cart.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private stripeClient: Stripe;

  constructor(
    private readonly config: ConfigService,
    private readonly cartService: CartService,
  ) {
    this.stripeClient = new Stripe(config.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2022-11-15',
    });
  }

  getHello(): string {
    return 'Hello World!';
  }

  async createCheckoutSession(userId: string) {
    const cartItems = await this.cartService.getCart(userId);

    const transformCartItems = cartItems.map((item) => ({
      quantity: item.quantity,
      price_data: {
        unit_amount: Math.ceil(item.product.price * 100),
        currency: 'usd',
        product_data: {
          name: item.product.title,
          images: [item.product.image],
          description: item.product.description,
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
