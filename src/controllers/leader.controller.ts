import { Controller, Get } from '@nestjs/common';
import { SimpleLeaderBoardService } from 'src/service/leader.service';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('leader')
@Controller('leader')
export class LeaderController {
  constructor(private simpleLeaderBoardService: SimpleLeaderBoardService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch leaderboard' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'The limit of the leaderboard',
  })
  async fetchLeaderboard(): Promise<any> {
    return await this.simpleLeaderBoardService.fetchLeaderboard();
  }
}
