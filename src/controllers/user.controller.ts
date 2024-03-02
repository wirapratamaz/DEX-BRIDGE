import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from 'src/service/user.service';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('order')
  @ApiOperation({ summary: 'Order' })
  @ApiQuery({
    name: 'coin',
    required: true,
    description: 'The coin',
  })
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
  @ApiOperation({ summary: 'Cancel' })
  @ApiQuery({
    name: 'coin',
    required: true,
    description: 'The coin',
  })
  async cancel(
    @Query('coin') coin: string,
    @Query('oid') oid: number,
  ): Promise<any> {
    return await this.userService.cancel(coin, oid);
  }

  @Get('cancelByCloid')
  @ApiOperation({ summary: 'Cancel by cloid' })
  @ApiQuery({
    name: 'coin',
    required: true,
    description: 'The coin',
  })
  async cancelByCloid(
    @Query('coin') coin: string,
    @Query('cloid') cloid: string,
  ): Promise<any> {
    return await this.userService.cancelByCloid(coin, cloid);
  }
}
