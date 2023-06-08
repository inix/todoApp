import { ApiProperty } from '@nestjs/swagger';

export class UserInfoDto {
  @ApiProperty({
    required: false,
  })
  phone: string;

  @ApiProperty({
    required: false,
  })
  address: string;

  @ApiProperty({
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
    required: false,
  })
  photo: string;
}
