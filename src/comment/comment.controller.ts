import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { Comment } from './entities/comment.entity';
import { DeleteCommentDto } from './dto/delete-comment.dto';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiCreatedResponse({ type: Comment })
  @ApiBadRequestResponse({ description: 'DTO validation not met' })
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @ApiOkResponse({ type: Comment, isArray: true })
  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @ApiOkResponse({ type: Comment, isArray: true })
  @ApiNotFoundResponse({ description: 'Comment from organization not found' })
  @Get(':organization')
  findOne(@Param('organization') organization: string) {
    return this.commentService.findOne(organization);
  }

  @ApiOkResponse({ type: DeleteCommentDto })
  @Delete(':organization')
  remove(@Param('organization') organization: string) {
    return this.commentService.remove(organization);
  }
}
