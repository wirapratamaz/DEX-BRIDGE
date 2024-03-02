import { Injectable } from '@nestjs/common';
import { PostApiService } from './post-api.service';
import { SigningService } from './signing.service';
import { MetaDataService } from './meta-data.service';
import { OrderResponse } from './meta-data.service';
import { CancelByCloidRequest, CancelRequest, OrderRequest, OrderType, OrderWire, Tif } from 'src/exchange/interfaces/interface.order';

@Injectable()
export class ExchangeService {}