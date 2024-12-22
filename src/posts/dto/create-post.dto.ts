import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty } from 'class-validator';
import { CategoryEnum } from '../entities/category.entity';
import { StatusEnum } from '../entities/status.entity';

export class CreatePostDto {
  @ApiProperty({
    description: 'Title',
  })
  @IsNotEmpty({ message: 'title is required' })
  title: string;

  @ApiProperty({
    description: 'Description',
  })
  @IsNotEmpty({ message: 'description is required' })
  description: string;

  @ApiProperty({
    description: 'Category',
    enum: CategoryEnum,
  })
  @IsNotEmpty({ message: 'category is required' })
  @IsIn(['feature', 'ui', 'bug'], {
    message: 'invalid category',
  })
  category: string;

  @ApiProperty({
    description: 'Status',
    enum: StatusEnum,
  })
  @IsNotEmpty({ message: 'status is required' })
  @IsIn(['noted', 'planned', 'in_progress', 'done'], {
    message: 'invalid status',
  })
  status: string;

  authorId: string;
}
