import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  organization: string;

  @Column()
  comment: string;

  @DeleteDateColumn()
  deleted_date: Date;
}
