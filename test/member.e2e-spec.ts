import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MemberModule } from '../src/member/member.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Member } from '../src/member/entities/member.entity';

describe('MemberController (e2e)', () => {
  let app: INestApplication;

  const members = [
    {
      login_id: 1,
      login: 'test',
      cnt_followers: 1,
    },
    {
      login_id: 2,
      login: 'test2',
      cnt_followers: 2,
    },
    {
      login_id: 3,
      login: 'test3',
      cnt_followers: 3,
    },
  ];

  const membersOrdered = [
    {
      login_id: 3,
      login: 'test3',
      cnt_followers: 3,
    },
    {
      login_id: 2,
      login: 'test2',
      cnt_followers: 2,
    },
    {
      login_id: 1,
      login: 'test',
      cnt_followers: 1,
    },
  ];
  const mockMemberRepository = {
    findAll: jest
      .fn()
      .mockReturnValue(
        Promise.resolve(
          members.sort((a, b) =>
            a.cnt_followers > b.cnt_followers
              ? -1
              : b.cnt_followers > a.cnt_followers
              ? 1
              : 0,
          ),
        ),
      ),
    find: jest.fn().mockReturnValue(Promise.resolve(members)),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MemberModule],
    })
      .overrideProvider(getRepositoryToken(Member))
      .useValue(mockMemberRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/member (GET)', () => {
    return request(app.getHttpServer())
      .get('/member')
      .expect(200)
      .expect(membersOrdered);
  });
});
