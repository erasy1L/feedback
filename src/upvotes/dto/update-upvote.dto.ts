import { PartialType } from '@nestjs/swagger';
import { CreateUpvoteDto } from './create-upvote.dto';

export class UpdateUpvoteDto extends PartialType(CreateUpvoteDto) {}
