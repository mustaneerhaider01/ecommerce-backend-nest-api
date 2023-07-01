import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard)
  @Post('api/create-checkout-session')
  async createCheckoutSession(@Req() req: Request) {
    const userId = req['user'].userId as string;
    const sessionId = await this.appService.createCheckoutSession(userId);
    return { sessionId };
  }
}
