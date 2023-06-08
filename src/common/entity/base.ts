import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Base extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: 'primary key',
  })
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'created_at',
    comment: 'Created date',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'updated_at',
    comment: 'Updated date',
  })
  updatedAt: Date;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
    name: 'is_deleted',
    comment: 'Is deleted or not',
  })
  isDeleted: boolean;

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'deleted_at',
    comment: 'Soft delete date',
  })
  deletedAt: Date;
}
