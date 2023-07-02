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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schema/user.schema");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const cart_schema_1 = require("../cart/schema/cart.schema");
let AuthService = exports.AuthService = class AuthService {
    constructor(userModel, cartModel, jwtService) {
        this.userModel = userModel;
        this.cartModel = cartModel;
        this.jwtService = jwtService;
    }
    async createUser(email, password) {
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new common_1.BadRequestException('Email already exists');
        }
        const hashedPw = await bcrypt.hash(password, 10);
        const newUser = new this.userModel({ email, password: hashedPw });
        const createdUser = await newUser.save();
        const userCart = new this.cartModel({
            user: createdUser.id,
            items: [],
        });
        await userCart.save();
        return createdUser.id;
    }
    async loginUser(email, password) {
        const existingUser = await this.userModel.findOne({ email });
        if (!existingUser) {
            throw new common_1.BadRequestException("Couldn't find a user with this email");
        }
        const isEqual = await bcrypt.compare(password, existingUser.password);
        if (!isEqual) {
            throw new common_1.BadRequestException('Incorrect password');
        }
        const authToken = await this.jwtService.signAsync({ userId: existingUser.id }, { expiresIn: '1h' });
        return [authToken, existingUser.id];
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(cart_schema_1.Cart.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map