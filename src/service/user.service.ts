import { Injectable } from '@nestjs/common';
import { OrderResponse } from 'src/exchange/interfaces/interface.response';
import { ExchangeService } from 'src/exchange/rest-api/exchange.service';
import { InfoService } from 'src/exchange/rest-api/info.service';

@Injectable()
export class UserService {
  constructor(
    private exchangeService: ExchangeService,
    private infoService: InfoService,
  ) {}

  public async order(
    coin: string,
    isBuy: boolean,
    price: number,
    size: number,
    reduceOnly = false,
  ): Promise<OrderResponse> {
    return await this.exchangeService.order(
      coin,
      isBuy,
      price,
      size,
      reduceOnly,
    );
  }

  public async cancel(coin: string, oid: number): Promise<OrderResponse> {
    return await this.exchangeService.cancel(coin, oid);
  }

  public async cancelByCloid(
    coin: string,
    cloid: string,
  ): Promise<OrderResponse> {
    return await this.exchangeService.cancelByCloid(coin, cloid);
  }

  public async getAccountInfo(userId: string) {
    return await this.infoService.getAccountInfo(userId);
  }
}
