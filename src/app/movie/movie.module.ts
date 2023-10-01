import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieRepository } from './movie.repository';

@Module({
  controllers: [],
  providers: [MovieService, MovieRepository],
  exports: [MovieService],
})
export class MovieModule {}
