import { Column, Entity } from 'typeorm';
import { Base } from '../../common/entity/base';

@Entity()
export class TodoComments extends Base {
  @Column({
    type: 'bigint',
    nullable: false,
    default: 0,
    name: 'todo_id',
    comment: 'Todo id',
  })
  todoId: number;

  @Column({
    type: 'bigint',
    nullable: false,
    default: 0,
    name: 'user_id',
    comment: 'Creator of this comment',
  })
  userId: number;

  @Column({
    type: 'text',
    nullable: false,
    default: '',
    comment: 'Comment of todo',
  })
  comment?: string;
}
