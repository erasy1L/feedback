import { ApiProperty } from '@nestjs/swagger';
import { Post } from '../entities/post.entity';

export class PostResponseDto {
  @ApiProperty({ type: 'string' })
  id: string;
  @ApiProperty({ type: 'string' })
  title: string;
  @ApiProperty({ type: 'string' })
  description: string;
  @ApiProperty({ type: 'string' })
  authorId: string;
  @ApiProperty({ type: 'string' })
  createdAt: Date;
  @ApiProperty({ type: 'string' })
  updatedAt: Date;
  @ApiProperty({ type: 'string' })
  status: string;
  @ApiProperty({ type: 'string' })
  category: string;

  constructor(partial: Partial<Post>) {
    Object.assign(this, {
      ...partial,
      status: partial.status?.value,
      category: partial.category?.value,
    });
    delete (this as any).categoryId;
    delete (this as any).statusId;
  }
}

class PaginationMetaDto {
  @ApiProperty({ type: 'number' })
  page: number;

  @ApiProperty({ type: 'number' })
  limit: number;

  @ApiProperty({ type: 'number' })
  total: number;

  @ApiProperty({ type: 'number' })
  totalPages: number;

  @ApiProperty({ type: 'boolean' })
  hasNextPage: boolean;

  @ApiProperty({ type: 'boolean' })
  hasPreviousPage: boolean;
}

export class PostsResponseDto {
  @ApiProperty({ type: PostResponseDto, isArray: true })
  data: PostResponseDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;

  constructor(posts: Post[], meta: PaginationMetaDto) {
    this.data = posts.map((post) => new PostResponseDto(post));
    this.meta = meta;
  }
}
