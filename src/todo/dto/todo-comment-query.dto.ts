import { BaseQueryDto } from '../../common/dto/base-query.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class TodoCommentQueryDto extends BaseQueryDto {
  @ApiPropertyOptional({
    required: false,
    description: 'Todo id',
  })
  @IsOptional()
  readonly todoId?: number;

  @ApiPropertyOptional({
    required: false,
    description: 'User id',
  })
  @IsOptional()
  readonly userId?: number;

  @ApiPropertyOptional({
    required: false,
    description: 'Comment',
  })
  @IsOptional()
  readonly comment?: number;
}
