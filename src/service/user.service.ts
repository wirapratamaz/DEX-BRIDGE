import { Injectable } from '@nestjs/common';
import { ExchangeService } from 'src/exchange/rest-api/exchange.service';
import { InfoService } from 'src/exchange/rest-api/info.service';
import { OrderRequest } from 'src/exchange/interfaces/interface.order';

@Injectable()
export class AppService {
  constructor(
    private exchangeService: ExchangeService,
    private infoService: InfoService,
  ) {}

  async order(
    coin: string,
    isBuy: boolean,
    price: number,
    size: number,
    reduceOnly = false,
  ): Promise<any> {
    return await this.exchangeService.order(
      coin,
      isBuy,
      price,
      size,
      reduceOnly,
    );
  }

  async bulkOrder(orderList: OrderRequest[]): Promise<any> {
    return await this.exchangeService.bulkOrder(orderList);
  }

  async cancel(coin: string, oid: number): Promise<any> {
    return await this.exchangeService.cancel(coin, oid);
  }

  //   async getL2Book(coin: string): Promise<any> {
  //     return await this.infoService.l2Book(coin);
  //   }
}
