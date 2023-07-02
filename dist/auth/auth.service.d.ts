import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Cart } from '../cart/schema/cart.schema';
export declare class AuthService {
    private readonly userModel;
    private readonly cartModel;
    private readonly jwtService;
    constructor(userModel: Model<User>, cartModel: Model<Cart>, jwtService: JwtService);
    createUser(email: string, password: string): Promise<string>;
    loginUser(email: string, password: string): Promise<[string, string]>;
}
