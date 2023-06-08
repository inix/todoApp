import { BaseQueryListVo } from '../../common/vo/base-query-list.vo';
import { ApiProperty } from '@nestjs/swagger';
import { Todo } from '../entity/todo.entity';

export class TodoListVo extends BaseQueryListVo {
  @ApiProperty({
    description: 'List of todo',
    type: Todo,
    isArray: true,
  })
  data: Todo[];
}
