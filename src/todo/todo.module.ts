import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoRepository } from './repository/todo.repository';
import { TodoService } from './service/todo.service';
import { TodoController } from './todo.controller';
import { TodoComments } from './entity/todo-comments.entity';
import { UserRepository } from '../auth/repository/user.repository';
import { CommentUserRelation } from './entity/comment-user-relation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TodoRepository,
      UserRepository,
      TodoComments,
      CommentUserRelation,
    ]),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
