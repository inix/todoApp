import { BaseQueryDto } from '../../common/dto/base-query.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CommentUserRelationQueryDto extends BaseQueryDto {
  @ApiPropertyOptional({
    required: false,
    description: 'Comment id',
  })
  @IsOptional()
  readonly commentId?: number;

  @ApiPropertyOptional({
    required: false,
    description: 'User id',
  })
  @IsOptional()
  readonly userId?: number;
}
