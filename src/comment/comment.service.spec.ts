import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from './comment.service';

describe('CommentService', () => {
  let service: CommentService;

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
      return [
        {
          id: 0,
          organization: organization,
          comment: 'string',
          deleted_date: null,
        },
      ];
    }),
    remove: jest.fn().mockImplementation((organization) => {
      return {
        organization: organization,
        deleted: true,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentService],
    })
      .overrideProvider(CommentService)
      .useValue(mockCommentService)
      .compile();

    service = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create comment', () => {
    expect(
      service.create({ organization: 'test', comment: 'test comment' }),
    ).toHaveProperty('comment', 'test comment');
  });

  it('should get all comments', () => {
    expect(service.findAll()).toHaveLength(1);
  });

  it('should get certain comments from certain organization', () => {
    expect(service.findOne('xendit')).toHaveLength(1);
    expect(service.findOne('xendit')[0]).toHaveProperty(
      'organization',
      'xendit',
    );
  });

  it('should delete comments from organization', () => {
    expect(service.remove('xendit')).toHaveProperty('organization', 'xendit');
    expect(service.remove('xendit')).toHaveProperty('deleted', true);
  });
});
