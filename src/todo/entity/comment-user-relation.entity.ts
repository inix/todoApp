import { Column, Entity } from 'typeorm';
import { Base } from '../../common/entity/base';

@Entity()
export class CommentUserRelation extends Base {
  @Column({
    type: 'bigint',
    nullable: false,
    default: 0,
    name: 'comment_id',
    comment: 'Comment id',
  })
  commentId: number;

  @Column({
    type: 'bigint',
    nullable: false,
    default: 0,
    name: 'user_id',
    comment: 'User id',
  })
  userId: number;
}
