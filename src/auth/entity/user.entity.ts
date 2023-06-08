import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Todo } from '../../todo/entity/todo.entity';
import { UserInfo } from '../../user/entity/user-info.entity';
import { Base } from '../../common/entity/base';

@Entity()
@Unique(['username'])
export class User extends Base {
  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column()
  salt: string;

  @OneToMany((type) => Todo, (todo) => todo.user, { eager: true })
  todo: Todo[];

  @OneToOne((type) => UserInfo, { eager: true })
  @JoinColumn()
  user_info: UserInfo;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
