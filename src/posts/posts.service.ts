import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { v7 as uuidv7 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Status } from './entities/status.entity';
import { Category } from './entities/category.entity';
import { PostResponseDto, PostsResponseDto } from './dto/post-response.dto';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);

  constructor(
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const id = uuidv7();
    try {
      const category = await this.categoryRepository.findOneOrFail({
        where: { value: createPostDto.category },
      });

      const status = await this.statusRepository.findOneOrFail({
        where: { value: createPostDto.status },
      });

      const post = this.postRepository.create({
        id: id,
        title: createPostDto.title,
        description: createPostDto.description,
        authorId: createPostDto.authorId,
        categoryId: category.id,
        statusId: status.id,
      });
      const savedPost = await this.postRepository.save(post);
      return { id: savedPost.id };
    } catch (error) {
      this.logger.error('error saving post:', error);
      throw new InternalServerErrorException('failed to create post');
    }
  }

  async list(
    page: number = 1,
    limit: number = 20,
    sort?: string[],
    category?: string,
    status?: string,
  ) {
    try {
      const skip = (page - 1) * limit;

      const { id: categoryId } = await this.categoryRepository.findOneOrFail({
        where: { value: category },
      });

      const { id: statusId } = await this.statusRepository.findOneOrFail({
        where: { value: status },
      });

      const where: Record<string, any> = {};
      if (category && category !== '') {
        where.categoryId = categoryId;
      }
      if (status && status !== '') {
        where.statusId = statusId;
      }

      let order: Record<string, 'ASC' | 'DESC'> = {};
      if (sort?.length) {
        for (const s of sort) {
          if (s.startsWith('-')) {
            order[s.substring(1)] = 'DESC';
          } else {
            order[s] = 'ASC';
          }
        }
      } else {
        order = { createdAt: 'DESC' };
      }

      const [posts, total] = await this.postRepository.findAndCount({
        ...(Object.keys(where).length && { where }),
        ...(Object.keys(order).length && { order }),
        skip,
        take: limit,
        relations: {
          category: true,
          status: true,
        },
      });

      const totalPages = Math.ceil(total / limit);

      return new PostsResponseDto(posts, {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      });
    } catch (error) {
      this.logger.error('error listing posts:', error);
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string) {
    try {
      const res = await this.postRepository.findOneOrFail({
        where: { id },
        relations: {
          category: true,
          status: true,
        },
      });
      return new PostResponseDto(res);
    } catch (error) {
      this.logger.error(`error getting post with id ${id}:`, error);
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(`post with id ${id} not found`);
      }
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    try {
      const category = await this.categoryRepository.findOneOrFail({
        where: { value: updatePostDto.category },
      });

      const status = await this.statusRepository.findOneOrFail({
        where: { value: updatePostDto.status },
      });

      const result = await this.postRepository.update(
        { id },
        {
          title: updatePostDto.title,
          description: updatePostDto.description,
          categoryId: category.id,
          statusId: status.id,
        },
      );
      if (result.affected === 0) {
        throw new NotFoundException(`user with ID ${id} not found`);
      }
    } catch (error) {
      this.logger.error(`error updating post with id ${id}:`, error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async delete(id: string) {
    try {
      const result = await this.postRepository.delete({ id });
      if (result.affected === 0) {
        throw new NotFoundException(`user with ID ${id} not found`);
      }
    } catch (error) {
      this.logger.error(`error deleting post with id ${id}:`, error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async getEnum(name: string) {
    try {
      const result: any[] = await this.postRepository.query(
        `SELECT unnest(enum_range(NULL::${name}))`,
      );
      /*
				[
					{
						unnest: value
					},
					...
				]
			*/
      return result.map((v) => v.unnest);
    } catch (error) {
      this.logger.error(`error getting enum ${name}:`, error);
      throw new InternalServerErrorException();
    }
  }
}
