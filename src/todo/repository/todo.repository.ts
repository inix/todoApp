import { User } from '../../auth/entity/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { TodoDto } from '../dto/todo.dto';
import { Todo } from '../entity/todo.entity';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  async createTodo(todoDto: TodoDto, user: User): Promise<Todo> {
    const { title, description, isComplete } = todoDto;

    const todo = new Todo();

    todo.title = title;
    todo.description = description;
    todo.isComplete = isComplete;
    todo.user = user;

    await todo.save();

    delete todo.user;
    return todo;
  }
}
