import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '../auth/entity/user.entity';
import { TodoDto } from './dto/todo.dto';
import { Todo } from './entity/todo.entity';
import { TodoPayload } from './interface/todo-payload.interface';
import { TodoService } from './service/todo.service';
import { TodoQueryDto } from './dto/todo-query.dto';
import { TodoListVo } from './vo/todo-list.vo';
import { CreateTodoCommentDto } from './dto/create-todo-comment.dto';
import { UpdateTodoCommentDto } from './dto/update-todo-comment.dto';
import { TodoCommentListVo, TodoCommentVo } from './vo/todo-comment.vo';
import { TodoCommentQueryDto } from './dto/todo-comment-query.dto';
import { CreateCommentUserRelationDto } from './dto/create-comment-user-relation.dto';
import { CommentUserRelationQueryDto } from './dto/comment-user-relation-query.dto';
import { CommentUserRelationListVo } from './vo/comment-user-relation.vo';

const commentsPrefix = 'comments';
const mentionPrefix = 'mention';

@ApiTags('Todo')
@ApiBearerAuth()
@Controller('todo')
@UseGuards(AuthGuard())
export class TodoController {
  constructor(private todoService: TodoService) {}

  @ApiOperation({
    summary: 'Create a Todo',
    description: 'Create a Todo',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UsePipes(ValidationPipe)
  createTodo(
    @Body() todoDto: TodoDto,
    @GetUser() user: User,
  ): Promise<TodoPayload> {
    return this.todoService.createTodo(todoDto, user);
  }

  /**
   * Get todo comments
   * @param queryDto
   */
  @ApiOperation({
    summary: 'Get list of comments',
    description: 'Get list of comments (sorted by created time DESC default)',
  })
  @HttpCode(HttpStatus.OK)
  @Get(commentsPrefix)
  async getTodoCommentsList(
    @Query() queryDto: TodoCommentQueryDto,
  ): Promise<TodoCommentListVo> {
    return this.todoService.getTodoCommentsList(queryDto);
  }

  /**
   * Get a list of relations
   * @param queryDto
   */
  @ApiOperation({
    summary: 'Get list of relations',
    description: 'Get list of relations',
  })
  @HttpCode(HttpStatus.OK)
  @Get(mentionPrefix)
  async getCommentUserRelationList(
    @Query() queryDto: CommentUserRelationQueryDto,
  ): Promise<CommentUserRelationListVo> {
    return this.todoService.getCommentUserRelationList(queryDto);
  }

  /**
   * Get a todo
   * @param id
   * @param user
   */
  @ApiOperation({
    summary: 'Get a todo by id',
    description: 'Get a todo by id',
  })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  getTodoById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Todo> {
    return this.todoService.getTodoById(id, user);
  }

  /**
   * Update a todo
   * @param id
   * @param todoDto
   * @param user
   */
  @ApiOperation({
    summary: 'Update a todo by id',
    description: 'Update a todo by id',
  })
  @HttpCode(HttpStatus.OK)
  @Patch('/:id')
  updateTodoById(
    @Param('id', ParseIntPipe) id: number,
    @Body() todoDto: TodoDto,
    @GetUser() user: User,
  ): Promise<TodoPayload> {
    return this.todoService.updateTodoById(id, todoDto, user);
  }

  @ApiOperation({
    summary: 'Delete a todo by id',
    description: 'Delete a todo by id',
  })
  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  deleteTodoById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    return this.todoService.deleteTodoById(id, user);
  }

  @ApiOperation({
    summary: 'Get a list of todos',
    description: 'Get a list of todos',
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getTodoList(@Query() queryDto: TodoQueryDto): Promise<TodoListVo> {
    return this.todoService.getTodoList(queryDto);
  }

  /*
  Comments
   */
  /**
   * Create a comment
   * @param commentDto
   */
  @ApiOperation({
    summary: 'Create a comment of a todo',
    description: 'Create a comment of a todo',
  })
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(ValidationPipe)
  @Post(commentsPrefix)
  async createTodoComment(
    @Body() commentDto: CreateTodoCommentDto,
  ): Promise<{ message: string }> {
    return this.todoService.createTodoComment(commentDto);
  }

  /**
   * Update a comment
   * @param id
   * @param updateDto
   */
  @ApiOperation({
    summary: 'Update the comment of a todo',
    description: 'Update the comment of a todo',
  })
  @Patch(commentsPrefix + '/:id')
  async updateTodoCommentById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateTodoCommentDto,
  ): Promise<{ message: string }> {
    return this.todoService.updateTodoCommentById(id, updateDto);
  }

  /**
   * Delete a comment
   * @param id
   */
  @ApiOperation({
    summary: 'Delete a comment',
    description: 'Delete a comment',
  })
  @Delete(commentsPrefix + '/:id')
  async deleteTodoCommentById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.todoService.deleteTodoCommentById(id);
  }

  /**
   * Get comment by id
   * @param id
   */
  @ApiOperation({
    summary: 'Get a comment by id',
    description: 'Get a comment by id',
  })
  @HttpCode(HttpStatus.OK)
  @Get(commentsPrefix + '/:id')
  async getTodoCommentById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TodoCommentVo> {
    return this.todoService.getTodoCommentById(id);
  }

  /*
  Mention user in comments
   */
  /**
   * Create a relation
   * @param relationDto
   */
  @ApiOperation({
    summary: 'Mention users in comment',
    description: 'Mention users in comment(add a relation)',
  })
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(ValidationPipe)
  @Post(mentionPrefix)
  async createCommentUserMentionRelation(
    @Body() relationDto: CreateCommentUserRelationDto,
  ): Promise<{ message: string }> {
    return this.todoService.createCommentUserMentionRelation(relationDto);
  }

  /**
   * Delete a relation by id
   * @param id
   */
  @ApiOperation({
    summary: 'Delete a relation by id',
    description: 'Delete a relation by id',
  })
  @HttpCode(HttpStatus.OK)
  @Delete(mentionPrefix + '/:id')
  async deleteCommentUserRelationById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.todoService.deleteCommentUserRelationById(id);
  }
}
