import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register({ email, password }: CreateUserDto): Promise<{
        message: string;
        userId: string;
    }>;
    login({ email, password }: CreateUserDto): Promise<{
        token: string;
        userId: string;
    }>;
}
