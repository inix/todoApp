import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateTodoCommentDto {
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
