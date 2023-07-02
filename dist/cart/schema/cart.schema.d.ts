import * as mongoose from 'mongoose';
import { User } from '../../auth/schema/user.schema';
import { Product } from '../../products/schema/product.schema';
export type CartDocument = mongoose.HydratedDocument<Cart>;
declare class CartItem {
    _id?: mongoose.Types.ObjectId;
    productId: Product | mongoose.Types.ObjectId;
    quantity: number;
}
export declare class Cart {
    user: User;
    items: CartItem[];
}
export declare const CartSchema: mongoose.Schema<Cart, mongoose.Model<Cart, any, any, any, mongoose.Document<unknown, any, Cart> & Omit<Cart & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Cart, mongoose.Document<unknown, {}, mongoose.FlatRecord<Cart>> & Omit<mongoose.FlatRecord<Cart> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
export {};
