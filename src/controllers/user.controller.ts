import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from 'src/service/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('order')
  async order(
    @Query('coin') coin: string,
    @Query('isBuy') isBuy: boolean,
    @Query('price') price: number,
    @Query('size') size: number,
    @Query('reduceOnly') reduceOnly: boolean,
  ): Promise<any> {
    return await this.userService.order(coin, isBuy, price, size, reduceOnly);
  }

  @Get('cancel')
  async cancel(
    @Query('coin') coin: string,
    @Query('oid') oid: number,
  ): Promise<any> {
    return await this.userService.cancel(coin, oid);
  }

  @Get('cancelByCloid')
  async cancelByCloid(
    @Query('coin') coin: string,
    @Query('cloid') cloid: string,
  ): Promise<any> {
    return await this.userService.cancelByCloid(coin, cloid);
  }
}
