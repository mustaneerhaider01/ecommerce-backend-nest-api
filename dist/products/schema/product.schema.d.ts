import * as mongoose from 'mongoose';
import { User } from '../../auth/schema/user.schema';
export type ProductDocument = mongoose.HydratedDocument<Product>;
export declare class Product {
    _id?: mongoose.Types.ObjectId;
    title: string;
    image: string;
    description: string;
    price: number;
    creator: User;
    createdAt: Date;
    updatedAt: Date;
}
export declare const ProductSchema: mongoose.Schema<Product, mongoose.Model<Product, any, any, any, mongoose.Document<unknown, any, Product> & Omit<Product & Required<{
    _id: mongoose.Types.ObjectId;
}>, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Product, mongoose.Document<unknown, {}, mongoose.FlatRecord<Product>> & Omit<mongoose.FlatRecord<Product> & Required<{
    _id: mongoose.Types.ObjectId;
}>, never>>;
