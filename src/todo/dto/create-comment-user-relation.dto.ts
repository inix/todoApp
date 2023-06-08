import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class CreateCommentUserRelationDto {
  @ApiProperty({
    required: true,
    default: 0,
    description: 'Comment id',
  })
  @IsNumber({}, { message: '[ERROR] Not a number.' })
  @Min(1)
  commentId: number;

  @ApiProperty({
    required: true,
    default: 0,
    description: 'User id',
  })
  @IsNumber({}, { message: '[ERROR] Not a number' })
  @Min(1)
  userId: number;
}
