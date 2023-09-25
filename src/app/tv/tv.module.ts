import { Module } from '@nestjs/common';
import { TvService } from './tv.service';
import { TvRepository } from './tv.repository';

@Module({
  controllers: [],
  providers: [TvService, TvRepository],
  exports: [TvService],
})
export class TvModule {}
