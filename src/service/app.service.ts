import { Injectable } from '@nestjs/common';
import { PostApiService } from 'src/exchange/rest-api/post-api.service';
import { ExchangeService } from 'src/exchange/rest-api/exchange.service';
import {
  CancelByCloidRequest,
  CancelRequest,
  OrderRequest,
} from 'src/exchange/interfaces/interface.order';

@Injectable()
export class AppService {
  constructor(
    private exchangeService: ExchangeService,
    private postApiService: PostApiService,
  ) {}

  async getCandles(coin: string, interval: string): Promise<any> {
    return await this.postApiService.baseAPI('candles', {
      coin: coin,
      interval: interval,
    });
  }

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

  async cancelByCloid(coin: string, cloid: string): Promise<any> {
    return await this.exchangeService.cancelByCloid(coin, cloid);
  }

  async bulkCancel(cancelList: CancelRequest[]): Promise<any> {
    return await this.exchangeService.bulkCancel(cancelList);
  }

  async bulkCancelByCloid(cancelList: CancelByCloidRequest[]): Promise<any> {
    return await this.exchangeService.bulkCancelByCloid(cancelList);
  }

  async getL2Book(coin: string): Promise<any> {
    return await this.postApiService.baseAPI('l2Book', { coin: coin });
  }
}
