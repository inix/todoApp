import { BaseQueryDto } from '../../common/dto/base-query.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export enum SortDirectionType {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum TodoQuerySortType {
  IdAsc = 'IdAsc',
  IdDesc = 'IdDesc',
  TitleAsc = 'TitleAsc',
  TitleDesc = 'TitleDesc',
  CreatedAtAsc = 'CreatedAtAsc',
  CreatedAtDesc = 'CreatedAtDesc',
  CompletedAtAsc = 'CompletedAtAsc',
  CompletedAtDesc = 'CompletedAtDesc',
  CreatorIdAsc = 'CreatorIdAsc',
  CreatorIdDesc = 'CreatorIdDesc',
}

export class TodoQueryDto extends BaseQueryDto {
  @ApiPropertyOptional({
    required: false,
    description: 'Title of todos',
  })
  @IsOptional()
  readonly title?: string;

  @ApiPropertyOptional({
    required: false,
    description: 'Description of todos',
  })
  @IsOptional()
  readonly description?: string;

  @ApiPropertyOptional({
    required: false,
    description: 'Status of todos',
  })
  @IsOptional()
  readonly isComplete?: boolean;

  @ApiPropertyOptional({
    required: false,
    description: 'Start date',
  })
  @IsOptional()
  readonly startDate?: string;

  @ApiPropertyOptional({
    required: false,
    description: 'End date',
  })
  @IsOptional()
  readonly endDate?: string;

  @ApiPropertyOptional({
    required: false,
    description: 'Creator id',
  })
  @IsOptional()
  readonly userId?: number;

  @ApiPropertyOptional({
    required: false,
    description: 'Sort Type (Enum Type)',
    enum: TodoQuerySortType,
  })
  @IsEnum({ TodoQuerySortType }, { message: 'Invalid enum type' })
  @IsOptional()
  readonly sort?: TodoQuerySortType;
}
