import { BaseQueryVo } from '../../common/vo/base-query.vo';
import { ApiProperty } from '@nestjs/swagger';

export class TodoVo extends BaseQueryVo {
  @ApiProperty({
    description: 'Todo id',
  })
  id: number;

  @ApiProperty({
    description: 'Todo title',
  })
  title: string;

  @ApiProperty({
    description: 'Todo description',
  })
  description?: string;

  @ApiProperty({
    description: 'Todo complete status',
  })
  isComplete: boolean;

  @ApiProperty({
    description: 'Creator id',
  })
  userId: number;

  @ApiProperty({
    description: 'Created date',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Updated date',
  })
  updatedAt: Date;
}
