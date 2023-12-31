import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaResolver } from './media.resolver';
import { MovieModule } from '../movie/movie.module';
import { TvModule } from '../tv/tv.module';
import { MediaRepository } from './media.repository';

@Module({
  providers: [MediaResolver, MediaService, MediaRepository],
  exports: [MediaService],
  imports: [MovieModule, TvModule],
})
export class MediaModule {}
