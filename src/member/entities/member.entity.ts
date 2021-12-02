import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Member {
  @PrimaryColumn()
  login_id: number;

  @Column()
  login: string;

  @Column()
  avatar_url: string;

  @Column()
  cnt_followers: number;

  @Column()
  cnt_following: string;
}
