import { Controller, Get } from '@nestjs/common';
import { SimpleLeaderBoardService } from 'src/service/leader.service';

@Controller('leader')
export class LeaderController {
  constructor(private simpleLeaderBoardService: SimpleLeaderBoardService) {}

  @Get()
  async fetchLeaderboard(): Promise<any> {
    return await this.simpleLeaderBoardService.fetchLeaderboard();
  }
}
