import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  PrimaryColumn,
  ManyToOne,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { User } from './User';

@Entity('users_tokens')
export class UserTokens {
  @PrimaryColumn()
  id: string;

  @Column()
  refresh_token: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  expires_date: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
