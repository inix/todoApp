import { BaseQueryVo } from '../../common/vo/base-query.vo';
import { ApiProperty } from '@nestjs/swagger';
import { BaseQueryListVo } from '../../common/vo/base-query-list.vo';

export class TodoCommentVo extends BaseQueryVo {
  @ApiProperty({
    description: 'Todo id',
  })
  todoId: number;

  @ApiProperty({
    description: 'User id',
  })
  userId: number;

  @ApiProperty({
    description: 'Comment',
  })
  comment?: string;
}

export class TodoCommentListVo extends BaseQueryListVo {
  @ApiProperty({
    description: 'List of comments',
    type: TodoCommentVo,
    isArray: true,
  })
  data: TodoCommentVo[];
}
