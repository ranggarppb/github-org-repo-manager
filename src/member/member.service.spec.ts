import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { MemberService } from './member.service';

describe('MemberService', () => {
  let service: MemberService;

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

  const membersCopy = [...members];

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
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MemberService,
        {
          provide: getRepositoryToken(Member),
          useValue: mockMemberRepository,
        },
      ],
    }).compile();

    service = module.get<MemberService>(MemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return members with certain order', async () => {
    const result = await service.findAll();
    expect(result[0]).toEqual(membersCopy[2]);
  });
});
