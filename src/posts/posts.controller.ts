import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CategoryEnum } from './entities/category.entity';
import { StatusEnum } from './entities/status.entity';
import { UpvotesService } from 'src/upvotes/upvotes.service';
import { CreateUpvoteDto } from 'src/upvotes/dto/create-upvote.dto';
import { PostResponseDto, PostsResponseDto } from './dto/post-response.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly upvotesService: UpvotesService,
  ) {}

  @ApiOperation({ summary: 'Create a new proposal post' })
  @ApiInternalServerErrorResponse()
  @ApiBadRequestResponse()
  @ApiCreatedResponse({
    schema: {
      properties: {
        id: { type: 'string' },
      },
    },
  })
  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    return await this.postsService.create({
      ...createPostDto,
      authorId: req['user'].sub,
    });
  }

  @ApiOperation({
    summary:
      'List posts with pagination, sorting by created date and votes, filtering by category, status',
  })
  @ApiQuery({ name: 'page', type: 'number' })
  @ApiQuery({ name: 'limit', type: 'number', required: false, default: 20 })
  @ApiQuery({
    name: 'sort',
    type: 'string',
    required: false,
    examples: {
      single: {
        summary: 'Single sort',
        value: 'created',
      },
      multiple: {
        summary: 'Multiple sort fields',
        value: 'created,-votes',
      },
      allDescending: {
        summary: 'All descending',
        value: '-created,-votes',
      },
    },
  })
  @ApiQuery({
    name: 'category',
    type: 'string',
    enum: CategoryEnum,
    required: false,
  })
  @ApiQuery({
    name: 'status',
    type: 'string',
    enum: StatusEnum,
    required: false,
  })
  @ApiInternalServerErrorResponse()
  @ApiBadRequestResponse()
  @ApiOkResponse({ type: PostsResponseDto })
  @Get()
  async list(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort', {
      transform: (value: string) =>
        value
          .split(',')
          .map((v) => v.replace(/^(-)?(.*)created.*$/i, '$1createdAt')),
    })
    sort: string[],
    @Query('category')
    category: string,
    @Query('status')
    status: string,
  ) {
    return await this.postsService.list(page, limit, sort, category, status);
  }

  @ApiOperation({ summary: 'Get values of category' })
  @ApiInternalServerErrorResponse()
  @ApiBadRequestResponse()
  @ApiOkResponse({ type: 'array' })
  @Get('categories')
  async getCategories() {
    return await this.postsService.getEnum('Category');
  }

  @ApiOperation({ summary: 'Get values of status' })
  @ApiInternalServerErrorResponse()
  @ApiBadRequestResponse()
  @ApiOkResponse({ type: 'array' })
  @Get('statuses')
  async getStatuses() {
    return await this.postsService.getEnum('Status');
  }

  @ApiOperation({
    summary: 'Upvote or downvote a post',
  })
  @ApiParam({ name: 'id' })
  @ApiInternalServerErrorResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @Post('/upvote')
  async upvote(@Body() createUpvoteDto: CreateUpvoteDto, @Req() req: Request) {
    return await this.upvotesService.create(createUpvoteDto, req['user'].sub);
  }

  @ApiOperation({
    summary: 'Get upvotes count of post',
  })
  @ApiParam({ name: 'id' })
  @ApiInternalServerErrorResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: 'number' })
  @Get('/:id/votes')
  async getUpvotes(@Param('id') id: string) {
    return await this.upvotesService.listForPost(id);
  }

  @ApiOperation({
    summary: 'Get post with ID',
  })
  @ApiParam({ name: 'id' })
  @ApiInternalServerErrorResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: PostResponseDto })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.postsService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update post with ID',
  })
  @ApiInternalServerErrorResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return await this.postsService.update(id, updatePostDto);
  }

  @ApiOperation({
    summary: 'Delete post with ID',
  })
  @ApiInternalServerErrorResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.postsService.delete(id);
  }
}
