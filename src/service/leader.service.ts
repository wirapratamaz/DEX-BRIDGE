import { Injectable } from '@nestjs/common';
import axios from 'axios';

export interface LeaderboardRow {
  accountValue: string;
  displayName: string | null;
  ethAddress: string;
  prize: number;
}

export interface ApiResponse {
  leaderboardRows: LeaderboardRow[];
}

@Injectable()
export class SimpleLeaderBoardService {
  public async fetchLeaderboard(): Promise<LeaderboardRow[] | undefined> {
    const response = await axios.post('https://api-ui.hyperliquid.xyz/info', {
      type: 'leaderboard',
    });
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }
    const data: ApiResponse = response.data;

    return data.leaderboardRows;
  }
}
