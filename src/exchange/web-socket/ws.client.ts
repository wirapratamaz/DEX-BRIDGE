import { Injectable } from '@nestjs/common';
import * as WebSocket from 'ws';

import { Subscribe, SubscribeType } from '../interfaces/interface.ws';

@Injectable()
export class WebSocketManagerClient {
  private ws: WebSocket;
  private readonly pingIntervalMs = 30000;
  private readonly subscription: any;
  private readonly wsUrl: string;
  private pingInterval: any;

  constructor(
    private subscribe: Subscribe,
    private callback: (update: any) => void,
    isMainNet = true,
    // this.ws = new WebSocket('ws://localhost:3000');
  ) {
    // Set the WebSocket URL based on whether it's mainnet or testnet
    this.wsUrl = isMainNet
      ? 'wss://api.hyperliquid.xyz/ws'
      : 'wss://api.hyperliquid-testnet.xyz/ws';
    // Define the subscription types
    const subscriptionTypes: { [key in SubscribeType]?: any } = {
      allMids: { type: subscribe.type },
      notification: { type: subscribe.type, user: subscribe.user },
      webData2: { type: subscribe.type, user: subscribe.user },
      candle: {
        type: subscribe.type,
        coin: subscribe.coin,
        interval: subscribe.interval,
      },
      l2Book: { type: subscribe.type, user: subscribe.user },
      trades: { type: subscribe.type, coin: subscribe.coin },
      orderUpdates: { type: subscribe.type, user: subscribe.user },
      userEvents: { type: subscribe.type, user: subscribe.user },
      userFills: { type: subscribe.type, user: subscribe.user },
      userFundings: { type: subscribe.type, user: subscribe.user },
      userNonFundingLedgerUpdates: {
        type: subscribe.type,
        user: subscribe.user,
      },
    };

    this.subscription = subscriptionTypes[subscribe.type];

    if (!this.subscription) {
      throw new Error(`Invalid subscription type: ${subscribe.type}`);
    }

    this.connectToWebSocket();
  }

  private connectToWebSocket() {
    console.log('Connecting to WebSocket...');

    this.ws = new WebSocket(this.wsUrl);

    this.ws.on('open', () => {
      console.log('Open to WebSocket');
      this.subscribeToChannel();
      this.startPingInterval();
    });

    this.ws.on('message', (data) => {
      this.handleMessage(data);
    });

    this.ws.on('close', (code, reason) => {
      console.log(`Close to connection。Code: ${code}, Reason: ${reason}`);
      this.reconnect();
    });

    this.ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      this.reconnect();
    });
  }

  private subscribeToChannel() {
    this.ws.send(
      JSON.stringify({
        method: 'subscribe',
        subscription: this.subscription,
      }),
    );
  }

  protected handleMessage(data: WebSocket.Data) {
    const message = data.toString();
    const parsedMessage = JSON.parse(message);
    if (parsedMessage.channel == this.subscribe.type) {
      this.callback(parsedMessage.data);
    }
  }

  private startPingInterval() {
    this.pingInterval = setInterval(() => {
      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ method: 'ping' }));
      }
    }, this.pingIntervalMs);
  }

  private reconnect() {
    console.log('Reconnecting..');
    clearInterval(this.pingInterval);
    setTimeout(() => {
      this.connectToWebSocket();
    }, 5000); // 5秒後に再接続
  }
}
//   this.wsUrl = isMainNet ? 'wss://api.hyperliquid.xyz/ws' : 'wss://api.hyperliquid-testnet.xyz/ws';
//   const subscriptionTypes: { [key in SubscribeType]?: any } = {
//       "allMids": { "type": subscribe.type },
//       "notification": { "type": subscribe.type, "user": subscribe.user },
//       "webData2": { "type": subscribe.type, "user": subscribe.user },
//       "candle": { "type": subscribe.type, "coin": subscribe.coin, "interval": subscribe.interval },
//       "l2Book": { "type": subscribe.type, "user": subscribe.user },
//       "trades": { "type": subscribe.type, "coin": subscribe.coin },
//       "orderUpdates": { "type": subscribe.type, "user": subscribe.user },
//       "userEvents": { "type": subscribe.type, "user": subscribe.user },
//       "userFills": { "type": subscribe.type, "user": subscribe.user },
//       "userFundings": { "type": subscribe.type, "user": subscribe.user },
//       "userNonFundingLedgerUpdates": { "type": subscribe.type, "user": subscribe.user },
//   };
//   this.connectToWebSocket();
// //   public subscribe(subscribe: Subscribe) {
// //     this.ws.send(JSON.stringify(subscribe));
// //   }
// }

// // export class WsClient {
// //   private ws: WebSocket;

// //   constructor() {
// //     this.ws = new WebSocket('ws://localhost:3000');
// //   }

// //   public subscribe(subscribe: Subscribe) {
// //     this.ws.send(JSON.stringify(subscribe));
// //   }
// // }
