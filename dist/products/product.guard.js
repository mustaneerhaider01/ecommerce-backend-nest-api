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
exports.ProductGuard = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
let ProductGuard = exports.ProductGuard = class ProductGuard {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const productId = request.params.id;
        const userId = request['user'].userId;
        const product = await this.productsService.fetchProduct(productId);
        if (product.creator.id !== userId) {
            throw new common_1.UnauthorizedException('You are not allowed to update or delete the product');
        }
        return true;
    }
};
exports.ProductGuard = ProductGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductGuard);
//# sourceMappingURL=product.guard.js.map