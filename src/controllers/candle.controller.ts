import { Controller, Get, Query } from '@nestjs/common';
import { FetchCandleService } from 'src/service/candle.service';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('candle')
@Controller('candle')
export class CandleController {
  constructor(private fetchCandleService: FetchCandleService) {}

  @Get(':coin')
  @ApiOperation({ summary: 'Fetch candle on specific coin' })
  @ApiQuery({ name: 'coin', required: true, description: 'The coin symbol' })
  @ApiQuery({
    name: 'timeFrame',
    required: true,
    description: 'The time frame for the candle data',
  })
  async fetchCandle(
    @Query('coin') coin: string,
    @Query('timeFrame') timeFrame: number,
  ): Promise<any> {
    return await this.fetchCandleService.fetchCandle(coin, timeFrame);
  }
}
