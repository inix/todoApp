import { User } from '../../auth/entity/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../common/entity/base';

@Entity()
export class Todo extends Base {
  @Column({
    type: 'varchar',
    nullable: false,
    default: '',
  })
  title: string;

  @Column({
    type: 'text',
    nullable: false,
    default: '',
  })
  description: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: 0,
    name: 'is_complete',
  })
  isComplete: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'completed_at',
    comment: 'Complete time',
  })
  completedAt: Date;

  @ManyToOne((type) => User, (user) => user.todo, { eager: false })
  user: User;

  @Column({
    type: 'bigint',
  })
  userId: number;
}
