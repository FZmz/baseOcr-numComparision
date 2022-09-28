import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComparitionModule } from './module/comparition/comparition.module';

@Module({
  imports: [ComparitionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
