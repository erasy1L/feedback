import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UpvotesModule } from 'src/upvotes/upvotes.module';
import { Category } from './entities/category.entity';
import { Status } from './entities/status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Category, Status]), UpvotesModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
