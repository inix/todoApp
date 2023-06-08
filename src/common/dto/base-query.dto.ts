import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class BaseQueryDto {
  @ApiPropertyOptional({
    required: false,
    description: 'Items per page',
  })
  @IsOptional()
  readonly pageSize?: number;

  @ApiPropertyOptional({
    required: false,
    description: 'Current page number',
  })
  @IsOptional()
  readonly pageNumber?: number;
}
