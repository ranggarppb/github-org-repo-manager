import { ApiProperty } from '@nestjs/swagger';

export class DeleteCommentDto {
  @ApiProperty()
  organization: string;

  @ApiProperty()
  deleted: boolean;
}
