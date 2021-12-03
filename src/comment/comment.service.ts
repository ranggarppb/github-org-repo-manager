import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';

@Injectable()
export class CommentService extends TypeOrmQueryService<Comment> {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {
    super(commentRepository, { useSoftDelete: true });
  }

  create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const newComment = this.commentRepository.create(createCommentDto);
    return this.commentRepository.save(newComment);
  }

  findAll(): Promise<Comment[]> {
    return this.commentRepository.find({ where: { is_deleted: false } });
  }

  async findOne(organization: string): Promise<Comment[]> {
    return this.commentRepository.find({ where: { organization } });
  }

  remove(organization: string) {
    return this.commentRepository.softDelete(organization);
  }
}
