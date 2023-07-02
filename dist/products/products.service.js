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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const product_schema_1 = require("./schema/product.schema");
const mongoose_2 = require("mongoose");
let ProductsService = exports.ProductsService = class ProductsService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    async insertProduct({ creatorId, ...productInput }) {
        const newProduct = new this.productModel({
            ...productInput,
            creator: creatorId,
        });
        const createdProduct = await newProduct.save();
        return createdProduct.id;
    }
    async fetchProducts() {
        const products = await this.productModel.find();
        return products.map((prod) => this.transformProduct(prod));
    }
    async fetchProduct(productId) {
        const product = await this.findProduct(productId);
        return this.transformProduct(product);
    }
    async updateProduct({ title, image, price, description }, productId) {
        const updatedProduct = await this.productModel.findById(productId);
        if (title) {
            updatedProduct.title = title;
        }
        if (image) {
            updatedProduct.image = image;
        }
        if (price) {
            updatedProduct.price = price;
        }
        if (description) {
            updatedProduct.description = description;
        }
        await updatedProduct.save();
    }
    async removeProduct(productId) {
        await this.productModel.findByIdAndRemove(productId);
    }
    async findProduct(id) {
        let product;
        try {
            product = await this.productModel.findById(id).populate('creator');
        }
        catch {
            throw new common_1.BadRequestException("Couldn't find the product.");
        }
        if (!product) {
            throw new common_1.BadRequestException("Couldn't find the product.");
        }
        return product;
    }
    transformProduct(product) {
        return {
            id: product.id,
            title: product.title,
            image: product.image,
            description: product.description,
            price: product.price,
            createdAt: product.createdAt,
            creator: {
                id: product.creator?._id.toString(),
            },
        };
    }
};
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductsService);
//# sourceMappingURL=products.service.js.map