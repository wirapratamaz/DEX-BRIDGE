import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ExchangeModule } from '../exchange/exchange.module';

@Module({
  imports: [ExchangeModule],
  providers: [AppService],
})
export class AppModule {}
