import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  findAll(): Promise<Member[]> {
    return this.memberRepository
      .find()
      .then((member) =>
        member.sort((a, b) =>
          a.cnt_followers > b.cnt_followers
            ? -1
            : b.cnt_followers > a.cnt_followers
            ? 1
            : 0,
        ),
      );
  }
}
