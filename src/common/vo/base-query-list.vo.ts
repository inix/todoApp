import { ApiProperty } from '@nestjs/swagger';

export const PAGE_SIZE_DEFAULT = 10;
export const PAGE_NUMBER_DEFAULT = 1;

export class BaseQueryListVo {
  @ApiProperty({
    description: 'Total pages',
  })
  total: number;

  @ApiProperty({
    description: 'Items per page',
  })
  pageSize: number;

  @ApiProperty({
    description: 'Current page number',
  })
  pageNumber: number;
}
