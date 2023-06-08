import { BaseQueryVo } from '../../common/vo/base-query.vo';
import { ApiProperty } from '@nestjs/swagger';
import { BaseQueryListVo } from '../../common/vo/base-query-list.vo';

export class CommentUserRelationVo extends BaseQueryVo {
  @ApiProperty({
    description: 'Comment id',
  })
  commentId: number;

  @ApiProperty({
    description: 'User id',
  })
  userId: number;
}

export class CommentUserRelationListVo extends BaseQueryListVo {
  @ApiProperty({
    description: 'List of relations',
    type: CommentUserRelationVo,
    isArray: true,
  })
  data: CommentUserRelationVo[];
}
