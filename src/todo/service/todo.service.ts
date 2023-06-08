import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../auth/entity/user.entity';
import { TodoDto } from '../dto/todo.dto';
import { Todo } from '../entity/todo.entity';
import { TodoPayload } from '../interface/todo-payload.interface';
import { TodoRepository } from '../repository/todo.repository';
import {
  SortDirectionType,
  TodoQueryDto,
  TodoQuerySortType,
} from '../dto/todo-query.dto';
import { TodoListVo } from '../vo/todo-list.vo';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { Between, Equal, ILike, Repository } from 'typeorm';
import {
  PAGE_NUMBER_DEFAULT,
  PAGE_SIZE_DEFAULT,
} from '../../common/vo/base-query-list.vo';
import { TodoComments } from '../entity/todo-comments.entity';
import { CreateTodoCommentDto } from '../dto/create-todo-comment.dto';
import { UpdateTodoCommentDto } from '../dto/update-todo-comment.dto';
import { TodoCommentListVo, TodoCommentVo } from '../vo/todo-comment.vo';
import { TodoCommentQueryDto } from '../dto/todo-comment-query.dto';
import { CreateCommentUserRelationDto } from '../dto/create-comment-user-relation.dto';
import { CommentUserRelation } from '../entity/comment-user-relation.entity';
import { CommentUserRelationQueryDto } from '../dto/comment-user-relation-query.dto';
import { CommentUserRelationListVo } from '../vo/comment-user-relation.vo';

type ObjectType = Record<string, number | string | boolean>;

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoRepository)
    private todoRepository: TodoRepository,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(TodoComments)
    private readonly todoCommentsRepository: Repository<TodoComments>,
    @InjectRepository(CommentUserRelation)
    private readonly commentUserRelationRepository: Repository<CommentUserRelation>,
  ) {}

  /**
   * Create a todo
   * @param todoDto
   * @param user
   */
  async createTodo(todoDto: TodoDto, user: User): Promise<TodoPayload> {
    return this.todoRepository.createTodo(todoDto, user);
  }

  /**
   * Get todo by id
   * @param id
   * @param user
   */
  async getTodoById(id: number, user: User): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!todo) {
      throw new NotFoundException(`This ${id} is not found`);
    }
    return todo;
  }

  /**
   * Update todo by id
   * @param id
   * @param todoDto
   * @param user
   */
  async updateTodoById(
    id: number,
    todoDto: TodoDto,
    user: User,
  ): Promise<TodoPayload> {
    const todo = await this.getTodoById(id, user);
    todo.title = todoDto.title;
    todo.description = todoDto.description;

    if (todoDto.isComplete != null) {
      todo.isComplete = todoDto.isComplete;

      if (todoDto.isComplete) {
        todo.completedAt = new Date();
      }
    }

    await todo.save();
    return {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      isComplete: todo.isComplete,
      completedAt: todo.completedAt,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    };
  }

  /**
   * Delete todo by id
   * @param id
   * @param user
   */
  async deleteTodoById(id: number, user: User): Promise<{ message: string }> {
    const todo = await this.todoRepository.delete({ id, userId: user.id });

    if (todo.affected === 0) {
      throw new NotFoundException(`This ${id} is not found`);
    }
    return { message: 'Deleted successfully !' };
  }

  mapToObject = (map: Map<string, any>): ObjectType => {
    const obj: ObjectType = {};
    for (const [k, v] of map) {
      obj[k] = v;
    }
    return obj;
  };

  /**
   * Get todos
   * @param queryDto
   */
  async getTodoList(queryDto: TodoQueryDto): Promise<TodoListVo> {
    const {
      pageSize = PAGE_SIZE_DEFAULT,
      pageNumber = PAGE_NUMBER_DEFAULT,
      title,
      description,
      isComplete,
      startDate,
      endDate,
      userId,
    } = queryDto;

    if (startDate && endDate) {
      if (isNaN(Date.parse(startDate))) {
        throw new BadRequestException(
          `[ERROR] Invalid start date format: ${startDate}`,
        );
      }
      if (isNaN(Date.parse(endDate))) {
        throw new BadRequestException(
          `[ERROR] Invalid end date format: ${endDate}`,
        );
      }
      if (startDate > endDate) {
        throw new BadRequestException(
          `startDate(${startDate}) larger than endDate(${endDate})`,
        );
      }
    }

    // query
    const query = new Map();
    query.set('isDeleted', false);
    if (title) {
      query.set('title', ILike(`%${title}%`));
    }
    if (description) {
      query.set('description', Equal(`%${description}%`));
    }
    if (isComplete) {
      query.set('isComplete', Equal(isComplete));
    }
    if (userId) {
      query.set('userId', Equal(userId));
    }
    if (startDate && endDate) {
      query.set('updatedAt', Between(startDate, endDate));
    }
    const queryObj = this.mapToObject(query);

    // sort
    const orderType = new Map();
    if (queryDto.sort) {
      switch (queryDto.sort) {
        case TodoQuerySortType.IdAsc:
          orderType.set('id', SortDirectionType.ASC);
          break;
        case TodoQuerySortType.IdDesc:
          orderType.set('id', SortDirectionType.DESC);
          break;
        case TodoQuerySortType.TitleAsc:
          orderType.set('title', SortDirectionType.ASC);
          break;
        case TodoQuerySortType.TitleDesc:
          orderType.set('title', SortDirectionType.DESC);
          break;
        case TodoQuerySortType.CreatedAtAsc:
          orderType.set('createdAt', SortDirectionType.ASC);
          break;
        case TodoQuerySortType.CreatedAtDesc:
          orderType.set('createdAt', SortDirectionType.DESC);
          break;
        case TodoQuerySortType.CompletedAtAsc:
          orderType.set('completedAt', SortDirectionType.ASC);
          break;
        case TodoQuerySortType.CompletedAtDesc:
          orderType.set('completedAt', SortDirectionType.DESC);
          break;
        case TodoQuerySortType.CreatorIdAsc:
          orderType.set('userId', SortDirectionType.ASC);
          break;
        case TodoQuerySortType.CreatorIdDesc:
          orderType.set('userId', SortDirectionType.DESC);
          break;
      }
    }
    const orderObj = this.mapToObject(orderType);
    const [todos, count] = await this.todoRepository.findAndCount({
      select: [
        'id',
        'title',
        'description',
        'isComplete',
        'userId',
        'createdAt',
        'updatedAt',
      ],
      where: queryObj,
      order: orderObj,
    });
    return {
      data: todos,
      total: count,
      pageNumber: pageNumber,
      pageSize: pageSize,
    };
  }

  /**
   * Create todo comment.
   * @param commentDto
   */
  async createTodoComment(
    commentDto: CreateTodoCommentDto,
  ): Promise<{ message: string }> {
    // check todo
    const todo = await this.todoRepository.findOne({ id: commentDto.todoId });
    if (!todo) {
      throw new NotFoundException(
        `[ERROR] Todo(id=${commentDto.todoId}) is not found`,
      );
    }

    // check user
    const user = await this.userRepository.findOne({ id: commentDto.userId });
    if (!user) {
      throw new NotFoundException(
        `[ERROR] User(id=${commentDto.userId}) is not found.`,
      );
    }

    const comment = new TodoComments();
    comment.todoId = commentDto.todoId;
    comment.userId = commentDto.userId;
    comment.comment = commentDto.comment;
    await comment.save();
    return { message: 'Create comment successfully.' };
  }

  /**
   * Update todo comment
   * @param id
   * @param updateDto
   */
  async updateTodoCommentById(
    id: number,
    updateDto: UpdateTodoCommentDto,
  ): Promise<{ message: string }> {
    const comment = await this.todoCommentsRepository.findOne({
      id: id,
      isDeleted: false,
    });
    if (!comment) {
      throw new NotFoundException(`[ERROR] Comment(id=${id}) is not found`);
    }
    comment.comment = updateDto.comment;
    await comment.save();
    return { message: 'Update comment successfully.' };
  }

  /**
   * Delete comment
   * @param id
   */
  async deleteTodoCommentById(id: number): Promise<{ message: string }> {
    const comment = await this.todoCommentsRepository.findOne({
      id: id,
      isDeleted: false,
    });
    if (!comment) {
      throw new NotFoundException(
        `[ERROR] Comment(id=${id}) is not found or had been deleted.`,
      );
    }
    comment.isDeleted = true;
    comment.deletedAt = new Date();
    await comment.save();
    return { message: 'Delete comment successfully.' };
  }

  /**
   * Get comment by id
   * @param id
   */
  async getTodoCommentById(id: number): Promise<TodoCommentVo> {
    const comment = await this.todoCommentsRepository.findOne({
      where: {
        id: id,
        isDeleted: false,
      },
    });
    if (!comment) {
      throw new NotFoundException(`[ERROR] Comment(id=${id}) is not found.`);
    }
    return comment;
  }

  /**
   * Get list of comments
   * @param queryDto
   */
  async getTodoCommentsList(
    queryDto: TodoCommentQueryDto,
  ): Promise<TodoCommentListVo> {
    const {
      pageSize = PAGE_SIZE_DEFAULT,
      pageNumber = PAGE_NUMBER_DEFAULT,
      todoId,
      userId,
      comment,
    } = queryDto;

    // query map
    const queryMap = new Map();
    queryMap.set('isDeleted', false);
    if (todoId) {
      queryMap.set('todoId', Equal(todoId));
    }
    if (userId) {
      queryMap.set('userId', Equal(userId));
    }
    if (comment) {
      queryMap.set('comment', ILike(`%${comment}%`));
    }
    const queryObj = this.mapToObject(queryMap);

    const [comments, count] = await this.todoCommentsRepository.findAndCount({
      select: ['id', 'comment', 'todoId', 'userId', 'createdAt', 'updatedAt'],
      where: queryObj,
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      data: comments,
      total: count,
      pageNumber: pageNumber,
      pageSize: pageSize,
    };
  }

  /*
  Comment user relation
   */
  /**
   * Create a mention relation
   * @param relationDto
   */
  async createCommentUserMentionRelation(
    relationDto: CreateCommentUserRelationDto,
  ): Promise<{ message: string }> {
    const comment = await this.todoCommentsRepository.findOne({
      where: {
        id: relationDto.commentId,
        isDeleted: false,
      },
    });
    if (!comment) {
      throw new NotFoundException(
        `[ERROR] Comment(id=${relationDto.commentId}) is not found.`,
      );
    }

    const user = await this.userRepository.findOne({
      where: {
        id: relationDto.userId,
        isDeleted: false,
      },
    });
    if (!user) {
      throw new NotFoundException(`[ERROR] User(id=${relationDto.userId})`);
    }

    const relation = new CommentUserRelation();
    relation.commentId = relationDto.commentId;
    relation.userId = relationDto.userId;
    await relation.save();
    return { message: 'Relation created successfully.' };
  }

  /**
   * Delete a relation by id
   * @param id
   */
  async deleteCommentUserRelationById(
    id: number,
  ): Promise<{ message: string }> {
    const relation = await this.commentUserRelationRepository.findOne({
      where: {
        id: id,
        isDeleted: false,
      },
    });
    if (!relation) {
      throw new NotFoundException(`[ERROR] Relation(${id}) is not found`);
    }

    relation.isDeleted = true;
    await relation.save();
    return { message: 'Delete relation successfully.' };
  }

  /**
   * Get a list of relations
   * @param queryDto
   */
  async getCommentUserRelationList(
    queryDto: CommentUserRelationQueryDto,
  ): Promise<CommentUserRelationListVo> {
    const {
      pageSize = PAGE_SIZE_DEFAULT,
      pageNumber = PAGE_NUMBER_DEFAULT,
      commentId,
      userId,
    } = queryDto;

    // query
    const queryMap = new Map();
    queryMap.set('isDeleted', false);
    if (commentId && commentId > 0) {
      queryMap.set('commentId', Equal(commentId));
    }
    if (userId && userId > 0) {
      queryMap.set('userId', Equal(userId));
    }
    const queryObj = this.mapToObject(queryMap);

    const [
      relations,
      count,
    ] = await this.commentUserRelationRepository.findAndCount({
      select: ['id', 'commentId', 'userId', 'createdAt', 'updatedAt'],
      where: queryObj,
    });

    return {
      data: relations,
      total: count,
      pageNumber: pageNumber,
      pageSize: pageSize,
    };
  }
}
