import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/cart.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('api/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addToCart(@Body() { productId }: AddToCartDto, @Req() req: Request) {
    const userId = req['user'].userId as string;
    await this.cartService.addItemToCart(productId, userId);
    return { message: 'Item added to cart' };
  }

  @Get()
  async getCart(@Req() req: Request) {
    const userId = req['user'].userId as string;
    const items = await this.cartService.getCart(userId);
    return { cart: { items } };
  }

  @Post('decrement')
  async decrementItemQuantity(
    @Body() { productId }: AddToCartDto,
    @Req() req: Request,
  ) {
    const userId = req['user'].userId as string;
    const isItemDeleted = await this.cartService.decreaseItemQuantity(
      productId,
      userId,
    );

    if (isItemDeleted) {
      return { message: 'Item removed from cart' };
    }
    return { message: 'Item quantity decreased' };
  }
}
