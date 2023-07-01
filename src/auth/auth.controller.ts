import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() { email, password }: CreateUserDto) {
    const userId = await this.authService.createUser(email, password);
    return { message: 'User created', userId };
  }

  @Post('login')
  async login(@Body() { email, password }: CreateUserDto) {
    const [token, userId] = await this.authService.loginUser(email, password);
    return { token, userId };
  }
}
