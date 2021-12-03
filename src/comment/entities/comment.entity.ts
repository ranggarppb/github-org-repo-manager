import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  organization: string;

  @ApiProperty()
  @Column()
  comment: string;

  @ApiProperty()
  @DeleteDateColumn()
  deleted_date: Date;
}
