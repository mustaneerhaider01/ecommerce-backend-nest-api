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
exports.CartSchema = exports.Cart = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const user_schema_1 = require("../../auth/schema/user.schema");
const product_schema_1 = require("../../products/schema/product.schema");
let CartItem = class CartItem {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, auto: true }),
    __metadata("design:type", mongoose.Types.ObjectId)
], CartItem.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: product_schema_1.Product.name,
        required: true,
    }),
    __metadata("design:type", Object)
], CartItem.prototype, "productId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 1 }),
    __metadata("design:type", Number)
], CartItem.prototype, "quantity", void 0);
CartItem = __decorate([
    (0, mongoose_1.Schema)()
], CartItem);
const CartItemSchema = mongoose_1.SchemaFactory.createForClass(CartItem);
let Cart = exports.Cart = class Cart {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: user_schema_1.User.name,
        required: true,
    }),
    __metadata("design:type", user_schema_1.User)
], Cart.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [CartItemSchema], default: [] }),
    __metadata("design:type", Array)
], Cart.prototype, "items", void 0);
exports.Cart = Cart = __decorate([
    (0, mongoose_1.Schema)()
], Cart);
exports.CartSchema = mongoose_1.SchemaFactory.createForClass(Cart);
//# sourceMappingURL=cart.schema.js.map