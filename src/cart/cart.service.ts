import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './schema/cart.schema';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Product } from 'src/products/schema/product.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<Cart>,
  ) {}

  async addItemToCart(productId: string, userId: string) {
    const existingCart = await this.findCart(userId);

    if (!existingCart) {
      const newCart = new this.cartModel({
        user: userId,
        items: [{ productId, quantity: 1 }],
      });

      await newCart.save();
    } else {
      const itemIndex = existingCart.items.findIndex(
        (item) => item.productId.toString() === productId,
      );

      if (itemIndex > -1) {
        const updatedItemQty = existingCart.items[itemIndex].quantity + 1;
        existingCart.items[itemIndex].quantity = updatedItemQty;
      } else {
        existingCart.items.push({
          quantity: 1,
          productId: new mongoose.Types.ObjectId(productId),
        });
      }

      await existingCart.save();
    }
  }

  async decreaseItemQuantity(
    productId: string,
    userId: string,
  ): Promise<boolean | void> {
    const cart = await this.findCart(userId);
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId,
    );

    let isDeleted = false;

    if (itemIndex > -1) {
      if (cart.items[itemIndex].quantity === 1) {
        cart.items.splice(itemIndex, 1);
        isDeleted = true;
      } else {
        const updatedItemQty = cart.items[itemIndex].quantity - 1;
        cart.items[itemIndex].quantity = updatedItemQty;
      }

      await cart.save();
      return isDeleted;
    }
  }

  async getCart(userId: string) {
    const cartDocument = await this.findCart(userId);
    const populatedCart = await cartDocument.populate('items.productId');

    const items = populatedCart.items.map((item) => {
      const cartProduct = item.productId as Product;
      return {
        id: item._id.toString(),
        product: {
          title: cartProduct.title,
          image: cartProduct.image,
          description: cartProduct.description,
          price: cartProduct.price,
        },
        quantity: item.quantity,
      };
    });

    return items;
  }

  async clearCart(userId: string) {
    const cart = await this.findCart(userId);
    cart.items = [];
    await cart.save();
  }

  private async findCart(userId: string) {
    const cart = await this.cartModel.findOne({ user: userId });
    return cart;
  }
}
