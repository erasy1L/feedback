import { Injectable, Logger } from '@nestjs/common';
import { CreateUpvoteDto } from './dto/create-upvote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Upvote } from './entities/upvote.entity';
import { Repository } from 'typeorm';
import { InternalServerError } from 'src/errors';

@Injectable()
export class UpvotesService {
  private readonly logger = new Logger(UpvotesService.name);

  constructor(
    @InjectRepository(Upvote) private upvoteRepository: Repository<Upvote>,
  ) {}

  async create({ postId, state }: CreateUpvoteDto, userId: string) {
    try {
      const upvote = this.upvoteRepository.create({ postId, state, userId });
      await this.upvoteRepository.save(upvote);
    } catch (error) {
      this.logger.error(`error saving upvote:`, error);
      throw new InternalServerError();
    }
  }

  async listForPost(postId: string): Promise<number> {
    try {
      const { up, down } = await this.upvoteRepository
        .createQueryBuilder('upvote')
        .select('SUM(CASE WHEN state = :up THEN 1 ELSE 0 END)', 'up')
        .addSelect('SUM(CASE WHEN state = :down THEN 1 ELSE 0 END)', 'down')
        .where('post_id = :postId', { postId, up: 'UP', down: 'DOWN' })
        .getRawOne();

      return (up || 0) - (down || 0);
    } catch (error) {
      this.logger.error(`error getting upvote count for post ${postId}`, error);
      throw new InternalServerError();
    }
  }

  // update(id: number, updateUpvoteDto: UpdateUpvoteDto) {
  //   return `This action updates a #${id} upvote`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} upvote`;
  // }
}
