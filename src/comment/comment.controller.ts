import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':organization')
  findOne(@Param('organization') organization: string) {
    return this.commentService.findOne(organization);
  }

  @Delete(':organization')
  remove(@Param('organization') organization: string) {
    return this.commentService.remove(organization);
  }
}
