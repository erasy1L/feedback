import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { VoteState } from '../entities/upvote.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUpvoteDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  postId: string;

  @ApiProperty({
    type: 'string',
    enum: VoteState,
    example: 'UP or DOWN',
  })
  @IsNotEmpty()
  @IsEnum(VoteState)
  state: VoteState;
}
