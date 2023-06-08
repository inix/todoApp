import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateTodoCommentDto {
  @ApiProperty({
    required: true,
    default: 0,
    description: 'Todo id',
  })
  @IsNotEmptyObject({ message: '[ERROR] Todo id is empty.' })
  readonly todoId: number;

  @ApiProperty({
    required: true,
    default: 0,
    description: 'Creator id of this comment',
  })
  @IsNotEmptyObject({ message: '[ERROR] user id is empty.' })
  readonly userId: number;

  @ApiProperty({
    required: true,
    default: '',
    description: 'Comment',
  })
  @IsString({ message: '[ERROR] Must be string type.' })
  @IsNotEmpty({ message: '[ERROR] Empty comment' })
  @MinLength(5, { message: '[ERROR] At least 5 chars.' })
  readonly comment: string;
}
