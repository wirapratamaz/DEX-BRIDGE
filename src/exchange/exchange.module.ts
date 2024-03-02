import { Module } from '@nestjs/common';
import { ExchangeService } from './rest-api/exchange.service';

@Module({
  providers: [ExchangeService],
})
export class ExchangeModule {}
