import { ApiProperty } from '@nestjs/swagger';

export class BaseQueryVo {
  @ApiProperty({
    description: 'Primary key',
  })
  id?: number;

  @ApiProperty({
    description: 'Created date',
  })
  createdAt?: Date;

  @ApiProperty({
    description: 'Updated date',
  })
  updatedAt?: Date;
}
