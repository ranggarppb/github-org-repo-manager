import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  @IsAlphanumeric()
  organization: string;

  @ApiProperty()
  @MaxLength(500)
  comment: string;
}
