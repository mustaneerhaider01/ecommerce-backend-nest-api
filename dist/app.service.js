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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const stripe_1 = require("stripe");
const cart_service_1 = require("./cart/cart.service");
const config_1 = require("@nestjs/config");
let AppService = exports.AppService = class AppService {
    constructor(config, cartService) {
        this.config = config;
        this.cartService = cartService;
        this.stripeClient = new stripe_1.default(config.get('STRIPE_SECRET_KEY'), {
            apiVersion: '2022-11-15',
        });
    }
    getHello() {
        return 'Hello World!';
    }
    async createCheckoutSession(userId) {
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
};
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        cart_service_1.CartService])
], AppService);
//# sourceMappingURL=app.service.js.map