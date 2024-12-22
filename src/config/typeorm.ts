import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { Upvote } from 'src/upvotes/entities/upvote.entity';
import { Category } from 'src/posts/entities/category.entity';
import { Status } from 'src/posts/entities/status.entity';
import { CategorySchema1734799849268 } from 'migrations/1734799849268-CategorySchema';
import { StatusSchema1734799895350 } from 'migrations/1734799895350-StatusSchema';
import { UserSchema1734798791233 } from 'migrations/1734798791233-UserSchema';
import { PostsSchema1734799961379 } from 'migrations/1734799961379-PostsSchema';
import { UpvoteSchema1734800485138 } from 'migrations/1734800485138-UpvoteSchema';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USERNAME'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  entities: [Category, Status, User, Post, Upvote],
  migrations: [
    CategorySchema1734799849268,
    StatusSchema1734799895350,
    UserSchema1734798791233,
    PostsSchema1734799961379,
    UpvoteSchema1734800485138,
  ],
});
