import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CommentModule } from '../src/comment/comment.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Comment } from '../src/comment/entities/comment.entity';

describe('CommentController (e2e)', () => {
  let app: INestApplication;

  const allData = [
    {
      id: 0,
      organization: 'string1',
      comment: 'string3',
      deleted_date: null,
    },
    {
      id: 1,
      organization: 'string1',
      comment: 'string1',
      deleted_date: null,
    },
  ];
  const mockCommentRepository = {
    create: jest.fn().mockImplementation((data) => data),
    save: jest.fn().mockImplementation((data) => Promise.resolve(data)),
    findAll: jest.fn().mockReturnValue(allData),
    find: jest.fn().mockReturnValue(allData),
    softDelete: jest.fn().mockImplementation((organization) => {
      return Promise.resolve({
        organization: organization,
        deleted: true,
      });
    }),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CommentModule],
    })
      .overrideProvider(getRepositoryToken(Comment))
      .useValue(mockCommentRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/comment (GET)', () => {
    return request(app.getHttpServer())
      .get('/comment')
      .expect(200)
      .expect(allData);
  });

  it('/comment/string1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/comment/string1')
      .expect(200)
      .expect(allData);
  });

  it('/comment (POST)', () => {
    return request(app.getHttpServer())
      .post('/comment')
      .send({ organization: 'string1', comment: 'string1' })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({
          organization: 'string1',
          comment: 'string1',
        });
      });
  });

  it('/comment/string1 (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/comment/string1')
      .expect(200)
      .expect({
        organization: 'string1',
        deleted: true,
      });
  });
});
