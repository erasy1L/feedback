import { Module } from '@nestjs/common';
import { UpvotesService } from './upvotes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upvote } from './entities/upvote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Upvote])],
  providers: [UpvotesService],
  exports: [UpvotesService],
})
export class UpvotesModule {}
