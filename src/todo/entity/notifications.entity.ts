import { Base } from 'src/common/entity/base';
import { Column, Entity } from 'typeorm';

@Entity()
export class Notifications extends Base {
  @Column({
    type: 'bigint',
    nullable: false,
    default: 0,
  })
  senderId: number;

  @Column({
    type: 'bigint',
    nullable: false,
    default: 0,
  })
  receiverId: number;

  @Column({
    type: 'varchar',
    nullable: false,
    default: '',
  })
  message: string;
}
