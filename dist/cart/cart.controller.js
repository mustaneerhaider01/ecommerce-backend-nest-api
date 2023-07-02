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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const cart_service_1 = require("./cart.service");
const cart_dto_1 = require("./dto/cart.dto");
const auth_guard_1 = require("../auth/auth.guard");
let CartController = exports.CartController = class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    async addToCart({ productId }, req) {
        const userId = req['user'].userId;
        await this.cartService.addItemToCart(productId, userId);
        return { message: 'Item added to cart' };
    }
    async getCart(req) {
        const userId = req['user'].userId;
        const items = await this.cartService.getCart(userId);
        return { cart: { items } };
    }
    async decrementItemQuantity({ productId }, req) {
        const userId = req['user'].userId;
        const isItemDeleted = await this.cartService.decreaseItemQuantity(productId, userId);
        if (isItemDeleted) {
            return { message: 'Item removed from cart' };
        }
        return { message: 'Item quantity decreased' };
    }
};
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cart_dto_1.AddToCartDto, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getCart", null);
__decorate([
    (0, common_1.Post)('decrement'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cart_dto_1.AddToCartDto, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "decrementItemQuantity", null);
exports.CartController = CartController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('api/cart'),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
//# sourceMappingURL=cart.controller.js.map