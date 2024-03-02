import { Controller, Get, Query } from '@nestjs/common';
import { FetchCandleService } from 'src/service/candle.service';

@Controller('candle')
export class CandleController {
  constructor(private fetchCandleService: FetchCandleService) {}

  @Get()
  async fetchCandle(
    @Query('coin') coin: string,
    @Query('timeFrame') timeFrame: number,
    @Query('barNum') barNum: number,
  ): Promise<any> {
    return await this.fetchCandleService.fetchCandle(coin, timeFrame, barNum);
  }
}
