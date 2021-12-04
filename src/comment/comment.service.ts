import { Injectable, NotFoundException } from '@nestjs/common';
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

  create(createCommentDto: CreateCommentDto): Promise<void | Comment> {
    const newComment = this.commentRepository.create(createCommentDto);
    return this.commentRepository
      .save(newComment)
      .then(() => newComment)
      .catch((error) => console.log(error));
  }

  async findAll(): Promise<void | Comment[]> {
    return this.commentRepository.find();
  }

  async findOne(organization: string): Promise<void | Comment[]> {
    const comments = await this.commentRepository.find({
      where: { organization },
    });
    if (comments.length === 0) {
      throw new NotFoundException(
        `Comment from organization ${organization} not found`,
      );
    }
    return comments;
  }

  async remove(organization: string): Promise<void | any> {
    const comments = await this.commentRepository.find({
      where: { organization },
    });
    if (comments.length === 0) {
      throw new NotFoundException(
        `Comment from organization ${organization} not found`,
      );
    } else {
      return this.commentRepository
        .softDelete({ organization })
        .then(() => {
          return { organization: organization, deleted: true };
        })
        .catch((error) => console.log(error));
    }
  }
}
