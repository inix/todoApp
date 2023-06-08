import { Column, Entity } from 'typeorm';
import { Base } from '../../common/entity/base';

@Entity()
export class UserInfo extends Base {
  @Column({
    type: 'varchar',
    nullable: false,
    default: '',
  })
  phone: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: '',
  })
  address: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: '',
  })
  photo: string;
}
