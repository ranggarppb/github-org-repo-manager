import { Test, TestingModule } from '@nestjs/testing';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';

describe('MemberController', () => {
  let controller: MemberController;

  const mockMemberService = {
    findAll: jest.fn(() => [
      { id: 1, name: 'test' },
      { id: 2, name: 'test2' },
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberController],
      providers: [MemberService],
    })
      .overrideProvider(MemberService)
      .useValue(mockMemberService)
      .compile();

    controller = module.get<MemberController>(MemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all members', () => {
    expect(controller.findAll()).toHaveLength(2);
    expect(mockMemberService.findAll).toHaveBeenCalled();
  });
});
