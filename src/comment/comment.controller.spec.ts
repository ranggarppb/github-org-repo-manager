import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

describe('CommentController', () => {
  let controller: CommentController;

  const mockCommentService = {
    create: jest.fn().mockImplementation((data) => data),
    findAll: jest.fn().mockImplementation(() => {
      return [
        {
          id: 0,
          organization: 'string',
          comment: 'string',
          deleted_date: null,
        },
      ];
    }),
    findOne: jest.fn().mockImplementation((organization) => {
      return {
        id: 0,
        organization: organization,
        comment: 'string',
        deleted_date: null,
      };
    }),
    remove: jest.fn().mockImplementation(() => {
      return {
        organization: 'string',
        deleted: true,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [CommentService],
    })
      .overrideProvider(CommentService)
      .useValue(mockCommentService)
      .compile();

    controller = module.get<CommentController>(CommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get create comment', () => {
    expect(
      controller.create({ organization: 'test', comment: 'test comment' }),
    ).toHaveProperty('organization', 'test');
    expect(mockCommentService.create).toHaveBeenCalled();
  });

  it('should get all comments', () => {
    expect(controller.findAll()).toHaveLength(1);
    expect(mockCommentService.findAll).toHaveBeenCalled();
  });

  it('should get one comment', () => {
    expect(controller.findOne('xendit')).toHaveProperty(
      'organization',
      'xendit',
    );
    expect(mockCommentService.findOne).toHaveBeenCalled();
  });

  it('should get delete comment', () => {
    expect(controller.remove('xendit')).toHaveProperty('deleted', true);
    expect(mockCommentService.remove).toHaveBeenCalled();
  });
});
