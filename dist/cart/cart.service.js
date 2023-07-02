"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const cart_schema_1 = require("./schema/cart.schema");
const mongoose_2 = require("mongoose");
const mongoose = require("mongoose");
let CartService = exports.CartService = class CartService {
    constructor(cartModel) {
        this.cartModel = cartModel;
    }
    async addItemToCart(productId, userId) {
        const existingCart = await this.findCart(userId);
        if (!existingCart) {
            const newCart = new this.cartModel({
                user: userId,
                items: [{ productId, quantity: 1 }],
            });
            await newCart.save();
        }
        else {
            const itemIndex = existingCart.items.findIndex((item) => item.productId.toString() === productId);
            if (itemIndex > -1) {
                const updatedItemQty = existingCart.items[itemIndex].quantity + 1;
                existingCart.items[itemIndex].quantity = updatedItemQty;
            }
            else {
                existingCart.items.push({
                    quantity: 1,
                    productId: new mongoose.Types.ObjectId(productId),
                });
            }
            await existingCart.save();
        }
    }
    async decreaseItemQuantity(productId, userId) {
        const cart = await this.findCart(userId);
        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
        let isDeleted = false;
        if (itemIndex > -1) {
            if (cart.items[itemIndex].quantity === 1) {
                cart.items.splice(itemIndex, 1);
                isDeleted = true;
            }
            else {
                const updatedItemQty = cart.items[itemIndex].quantity - 1;
                cart.items[itemIndex].quantity = updatedItemQty;
            }
            await cart.save();
            return isDeleted;
        }
    }
    async getCart(userId) {
        const cartDocument = await this.findCart(userId);
        const populatedCart = await cartDocument.populate('items.productId');
        const items = populatedCart.items.map((item) => {
            const cartProduct = item.productId;
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
    async clearCart(userId) {
        const cart = await this.findCart(userId);
        cart.items = [];
        await cart.save();
    }
    async findCart(userId) {
        const cart = await this.cartModel.findOne({ user: userId });
        return cart;
    }
};
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cart_schema_1.Cart.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CartService);
//# sourceMappingURL=cart.service.js.map