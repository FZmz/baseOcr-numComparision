import { Module } from '@nestjs/common';
import { ComparitionController } from './comparition.controller';
import { ComparitionService } from './comparition.service';

@Module({
  controllers: [ComparitionController],
  providers: [ComparitionService],
})
export class ComparitionModule {}
